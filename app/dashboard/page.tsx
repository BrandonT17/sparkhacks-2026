"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/ui/layout/header";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setData(null);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, limit: 10 }),
      });

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error:", error);
      setData({ error: "Sorry, something went wrong. Please try again." });
    }

    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="flex flex-col gap-5 p-4 mt-4">
      {/* SEARCH */}
      <section className="flex flex-col mb-4">
        <div className="text-center">
          {" "}
          <h1 className="pb-4 text-lg">What are you looking for?</h1>
        </div>
        <div className="w-3/5 mx-auto">
          <Field orientation="horizontal">
            <Input
              type="search"
              placeholder="Ask something like 'What can I wear to a Desi wedding?'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              className="h-10"
            />
            <Button onClick={search} disabled={loading} className="h-10">
              {loading ? "Searching..." : "Search"}
            </Button>
          </Field>
        </div>
      </section>

      {/* RESULTS */}
      <section className="border rounded-lg mt-4 p-4">
        <h1 className="pb-4 text-lg">Recommendations:</h1>
        <div className="border rounded-lg min-h-[200px] max-w-900px overflow-auto p-6">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Searching for products...</p>
            </div>
          )}

          {!loading && !data && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">
                Enter a search query to find products
              </p>
            </div>
          )}

          {!loading && data && (
            <div className="overflow-auto">
              <pre className="bg-gray-50 p-4 rounded text-xs">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
