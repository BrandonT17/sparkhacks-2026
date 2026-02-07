import { Separator } from "@/components/ui/separator";
import Header from "@/components/ui/layout/header";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <div className="border rounded-lg p-4 mt-4">
      {/* SEARCH */}
      <section className="mb-4 border-b pb-4">
        <h1 className="pb-4">What are you looking for?</h1>
        <Field orientation="horizontal">
          <Input
            type="search"
            placeholder="Ask something like 'What can I wear to a Desi wedding?'"
          />
          <Button>Search</Button>
        </Field>
      </section>
      {/* RECOMMENDATIONS */}
      <section className="mt-4 border-t pt-4">
        <h1 className="pb-4">Recommendations:</h1>
        <div className="border rounded-lg min-h-[200px]"></div>
      </section>
    </div>
  );
}
