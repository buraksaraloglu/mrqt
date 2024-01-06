import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ConnectShopifyForm() {
  return (
    <form
      action="/api/integrations/shopify/auth"
      method="GET"
      className="space-y-4"
    >
      <Input label="Shopify store URL" name="shop" />
      <Button>Connect store</Button>
    </form>
  );
}
