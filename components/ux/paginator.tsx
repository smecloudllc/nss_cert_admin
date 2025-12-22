import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { FiltersInterface } from "@/interfaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

// PROPS

type PaginatorProps = React.HTMLAttributes<HTMLDivElement> & {
  // total_items?: number;
  filters: FiltersInterface;
  setFilters: React.Dispatch<React.SetStateAction<FiltersInterface>>;
  next?: boolean;
  prev?: boolean;
  page: number;
  setPage: (page: number) => void;
  items: number;
  total?: number;
};

export default function Paginator({
  // total_items,
  items,
  filters,
  setFilters,
  next,
  prev,
  page,
  setPage,
  total,
}: PaginatorProps) {
  /**
   * functions
   */

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const changeDropCount = (value: string) => {
    setFilters({
      ...filters,
      drop: Number(value),
    });
  };

  return (
    <>
      <div className="lg:hidden md:hidden  flex justify-end">
        {items > 0 && (
          <p className="text-muted-foreground px-2">
            Showing {items || filters.drop}{" "}
            {filters?.drop || items === 1 ? "item" : "items"} out of {total}{" "}
            total {filters?.drop || items === 1 ? "item" : "items"}{" "}
          </p>
        )}
      </div>
      <div className="flex flex-row justify-between items-center gap-1">
        <button
          onClick={() => {
            prev && handlePageChange(page - 1);
          }}
          disabled={prev === false}
          className={`inline-flex items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
            prev === false ? "" : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <ChevronLeftIcon className="size-4" />
          <span className="hidden sm:block">Previous</span>
        </button>

        <section className="flex items-center gap-x-1">
          <div className="lg:block md:block hidden">
            {items > 0 && (
              <p className="text-muted-foreground px-2">
                Showing {items || filters.drop}{" "}
                {filters?.drop || items === 1 ? "item" : "items"} out of {total}{" "}
                total {filters?.drop || items === 1 ? "item" : "items"}{" "}
              </p>
            )}
          </div>
          <div>
            <Select
              value={filters?.drop ? filters?.drop.toString() : "8"}
              onValueChange={(value) => changeDropCount(value)}
            >
              <SelectTrigger className="w-full inline-flex items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                <SelectValue>
                  {filters?.drop
                    ? ` ${filters?.drop} item${
                        filters?.drop === 1 ? "" : "s"
                      }  on page`
                    : `${items} item${items === 1 ? "" : "s"}  on page`}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20 items per page</SelectItem>
                <SelectItem value="50">50 items per page</SelectItem>
                <SelectItem value="100">100 items per page</SelectItem>
                <SelectItem value="250">250 items per page</SelectItem>
                <SelectItem value="500">500 items per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button
            onClick={() => {
              next && handlePageChange(page + 1);
            }}
            disabled={next === false}
            className={`inline-flex items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
              next === false
                ? ""
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <span className="hidden sm:block">Next</span>
            <ChevronRightIcon className="size-4" />
          </button>
        </section>
      </div>
    </>
  );
}
