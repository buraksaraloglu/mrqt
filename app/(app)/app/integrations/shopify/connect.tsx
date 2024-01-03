import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ConnectShopifyForm() {
  return (
    <form className="space-y-4">
      <Input label="Shopify store URL" name="storeName" />
      <Button>Connect store</Button>
    </form>
  );
}
