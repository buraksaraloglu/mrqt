"use client";

import * as React from "react";
import { upsertAdAccount } from "@/actions/import-fb-adaccount";
import { AdAccount } from "@/services/facebook/interfaces";
import { FacebookAdAccount, FacebookAdAccountStatus } from "@prisma/client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/use-copy-clipboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/shared/icons";

const SUCCESS_STATUSES = [
  FacebookAdAccountStatus.ACTIVE,
  FacebookAdAccountStatus.ANY_ACTIVE,
];

const REVIEW_STATUSES = [
  FacebookAdAccountStatus.PENDING_CLOSURE,
  FacebookAdAccountStatus.PENDING_RISK_REVIEW,
];

const REJECTED_STATUSES = [
  FacebookAdAccountStatus.CLOSED,
  FacebookAdAccountStatus.ANY_CLOSED,
  FacebookAdAccountStatus.DISABLED,
];

// TODO: change these with actual copy tags
const AD_ACCOUNT_STATUSES = {
  [FacebookAdAccountStatus.ACTIVE]: "Active",
  [FacebookAdAccountStatus.ANY_ACTIVE]: "Active",
  [FacebookAdAccountStatus.CLOSED]: "Closed",
  [FacebookAdAccountStatus.ANY_CLOSED]: "Closed",
  [FacebookAdAccountStatus.PENDING_CLOSURE]: "In review",
  [FacebookAdAccountStatus.PENDING_RISK_REVIEW]: "In review",
  [FacebookAdAccountStatus.PENDING_SETTLEMENT]: "Pending settlement",
  [FacebookAdAccountStatus.UNSETTLED]: "Unsettled",
  [FacebookAdAccountStatus.DISABLED]: "Disabled",
};

export type AdAccountColumn = {
  status: FacebookAdAccountStatus;
} & AdAccount;

function WithCopy({ value, className }: { value: string; className?: string }) {
  const [copied, copy] = useCopyToClipboard();
  return (
    <div className="flex items-center gap-1">
      {value}
      <Button
        variant="ghost"
        size="xs"
        onClick={() => {
          copy(value);
          toast({
            title: "Copied",
          });
        }}
        className={cn(className)}
      >
        {/* {copied === value ? "Copied" : "Copy"} */}
        <Icons.copy className="h-3 w-3" />
      </Button>
    </div>
  );
}

function AdAccountSwitch({
  adAccount,
  defaultSelected = false,
}: {
  adAccount: AdAccount;
  defaultSelected?: boolean;
}) {
  const [selected, setSelected] = React.useState(() =>
    Boolean(defaultSelected),
  );
  const [value, copy] = useCopyToClipboard();

  const [isPending, startTransition] = React.useTransition();
  const onSwitch = React.useCallback(
    (isActive: boolean) => {
      startTransition(async () => {
        const { status, data } = await upsertAdAccount({
          ...adAccount,
          isActive,
        });
        if (status !== "success" || data === null) {
          toast({
            title: "Something went wrong.",
            description: "Could not import your ad accounts",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Updated",
            description: `${data.adAccount.name} has been ${
              isActive ? "activated" : "removed"
            }`,
          });
        }
      });
    },
    [adAccount],
  );

  const handleSwitch = React.useCallback(() => {
    setSelected((prev) => !prev);

    // TODO: would this work if api fails?
    onSwitch(!selected);
  }, [onSwitch, selected]);

  return (
    <form>
      <Switch checked={selected} onClick={handleSwitch} disabled={isPending} />
    </form>
  );
}

export const columns: ColumnDef<AdAccount>[] = [
  {
    id: "isActive",
    accessorKey: "isActive",
    header: ({ table }) => null,
    cell: ({ row, cell }) => {
      const adAccount = row.original;
      return (
        <AdAccountSwitch
          key={adAccount.id}
          adAccount={adAccount}
          defaultSelected={Boolean(cell.getValue())}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Typography variant="span" className="flex items-center gap-2">
          Name
          <Button
            variant="ghost"
            size="xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </Typography>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Typography variant="span" className="flex items-center gap-2">
          Status
          <Button
            variant="ghost"
            size="xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </Typography>
      );
    },
    cell: ({ row, cell }) => {
      const status = cell.getValue() as string;
      if (!status || !AD_ACCOUNT_STATUSES[status]) return null;
      const typedStatus = status as FacebookAdAccountStatus;
      const statusLabel = AD_ACCOUNT_STATUSES[typedStatus];

      const statusLevel: "active" | "review" | "rejected" =
        typedStatus in SUCCESS_STATUSES
          ? "active"
          : typedStatus in REVIEW_STATUSES
            ? "review"
            : typedStatus in REJECTED_STATUSES
              ? "rejected"
              : "active";

      return (
        <Badge>
          {statusLevel === "active" && <Icons.check className="h-4 w-4" />}
          {statusLevel === "review" && <Icons.clock className="h-4 w-4" />}
          {statusLevel === "rejected" && <Icons.close className="h-4 w-4" />}

          {statusLabel}
        </Badge>
      );
    },
  },
  {
    accessorKey: "spent",
    // header: "Spent last 28 days",
    header: ({ column }) => {
      return (
        <Typography variant="span" className="flex items-center gap-2">
          Spent last 28 days
          <Button
            variant="ghost"
            size="xs"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </Typography>
      );
    },
    cell: ({ row }) => {
      const spent = row.getValue("spent") as string;

      if (!spent) return null;

      return (
        <div className="text-right">
          <Badge>{spent}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "accountId",
    header: () => <div>Ad account ID</div>,
    cell: ({ row }) => {
      const accountId = row.getValue("accountId") as string;
      if (!accountId) {
        return null;
      }
      return <WithCopy value={accountId} className="font-medium" />;
    },
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

export interface AdAccountTableProps {
  fbAdAccounts?: AdAccount[];
  userAdAccounts?: FacebookAdAccount[];
  isLoading?: boolean;
}

export function FacebookAdAccountsTable({
  fbAdAccounts = [],
  userAdAccounts = [],
  isLoading = false,
}: AdAccountTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const mapped = React.useMemo(() => {
    const map = new Map<string, AdAccount>();
    userAdAccounts.forEach((adAccount) => {
      map.set(adAccount.id, adAccount);
    });

    return fbAdAccounts.map((fbAdAccount) => {
      const userAdAccount = map.get(fbAdAccount.id);
      return {
        ...fbAdAccount,
        ...userAdAccount,
      };
    });
  }, []);

  const table = useReactTable({
    data: mapped,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter ad accounts..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              View <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                    className="capitalize"
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 w-full">
                  <div className="flex w-full items-center justify-center gap-2 text-muted-foreground">
                    <Icons.spinner className="h-6 w-6 animate-spin" />
                    Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          {table.getCanPreviousPage() && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
          )}
          {table.getCanNextPage() && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
