"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { LiquidGlassFilter } from "@/components/ui/liquid-glass-filter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFilters } from "@/lib/filter-context"; 

export function AppSidebar() {
  const { filters, setGender, setSize, setPrice, setEthical } = useFilters();

  return (
    <Sidebar collapsible="offcanvas" className="bg-white">
      <SidebarHeader className="px-8 pt-20 pb-3">
        <h2 className="text-xl font-medium uppercase tracking-widest text-black">
          FILTERS
        </h2>
      </SidebarHeader>

      <SidebarContent className="px-8 ">
        <Accordion
          type="multiple"
          defaultValue={["gender", "size", "price"]}
          className="w-full"
        >
          <FilterItem value="gender" title="GENDER">
            <RadioGroup
              value={filters.gender}
              onValueChange={setGender}
              className="gap-2 pt-2"
            >
              {[
                { value: "all", label: "All" },
                { value: "women", label: "Women" },
                { value: "men", label: "Men" },
                { value: "unisex", label: "Unisex" },
              ].map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <RadioGroupItem value={opt.value} id={`g-${opt.value}`} />
                  <Label
                    htmlFor={`g-${opt.value}`}
                    className="text-sm font-normal text-neutral-700"
                  >
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FilterItem>

          <FilterItem value="size" title="SIZE">
            <RadioGroup
              value={filters.size}
              onValueChange={setSize}
              className="gap-2 pt-2"
            >
              {[
                { value: "all", label: "All" },
                { value: "xs", label: "XS" },
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
                { value: "xl", label: "XL" },
              ].map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <RadioGroupItem value={opt.value} id={`s-${opt.value}`} />
                  <Label
                    htmlFor={`s-${opt.value}`}
                    className="text-sm font-normal text-neutral-700"
                  >
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FilterItem>

          <FilterItem value="price" title="PRICE RANGE">
            <div className="pt-3">
              <div className="mb-2 flex items-center justify-between text-sm font-normal text-neutral-600">
                <span>${filters.priceMin}</span>
                <span>${filters.priceMax}</span>
              </div>

              <Slider
                value={[filters.priceMin, filters.priceMax]}
                onValueChange={(v) => setPrice(v as [number, number])}
                min={0}
                max={500}
                step={5}
                className="w-full"
              />
            </div>
          </FilterItem>
        </Accordion>

        <div className="pt-5 pb-2">
          <TooltipProvider delayDuration={600}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full">
                  <LiquidGlassFilter
                    label="Ethical shopping"
                    pressed={filters.ethical}
                    onPressedChange={setEthical}
                    className="w-full justify-center"
                  />
                </div>
              </TooltipTrigger>

              <TooltipContent
                side="bottom"
                align="center"
                sideOffset={6}
                className="max-w-[200px] rounded-md bg-white px-2.5 py-2 text-xs leading-snug text-neutral-800 border border-neutral-200 shadow-md text-center"
              >
                Shop smarter. This filter surfaces brands committed to ethical
                production and responsible sourcing.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

function FilterItem({
  value,
  title,
  children,
}: {
  value: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem value={value} className="border-b border-neutral-200">
      <div className="flex items-center py-3">
        <span className="text-base font-normal uppercase tracking-widest text-black">
          {title}
        </span>
      </div>

      <AccordionContent className="pb-3">{children}</AccordionContent>
    </AccordionItem>
  );
}
