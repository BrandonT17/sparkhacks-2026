"use client";

import { useState } from "react";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ui/layout/ProductCard";

interface Product {
  id: string;
  title: string;
  link: string;
  price: string;
  image: string;
}

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setProducts([]);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, limit: 10 }),
      });

      const result = await response.json();
      setProducts(result.products || []);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="p-4 mt-4">
      {/* SEARCH */}
      <section className="pb-8">
        <div className="text-center text-lg font-medium">
          <h1 className="pb-4">What are you looking for?</h1>
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
              className="min-h-[50px]"
            />
            <Button
              onClick={search}
              disabled={loading}
              className="min-h-[50px]"
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </Field>
        </div>
      </section>

      {/* RESULTS */}
      <section className="border rounded-lg mt-4 p-4">
        <h1 className="pb-4">
          {products.length > 0
            ? `Found ${products.length} products`
            : "Results:"}
        </h1>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center min-h-[200px]">
            <p className="text-gray-500">Searching for products...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="flex items-center justify-center min-h-[200px]">
            <p className="text-gray-400">
              Enter a search query to find products
            </p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                link={product.link}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
