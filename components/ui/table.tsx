"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";
import { BugIcon, TimerIcon } from "@phosphor-icons/react";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto p-0.5"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        " h-10 text-gray-500 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-2 py-4 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

function TableEmpty({ colSpan = 1 }: { colSpan?: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className="p-0 h-[300px]">
        <div className="flex flex-col items-center justify-center h-full w-full py-20">
          <div className="rounded-full bg-brand-secondary/50 dark:bg-brand-secondary/80 p-2">
            <div className="rounded-full border-6 border-brand-primary/10 dark:border-brand-primary/50 p-2">
              <TimerIcon
                weight="fill"
                className="w-8 h-8 text-brand-primary dark:text-brand-secondary"
              />
            </div>
          </div>
          <p className="text-neutral-400 font-bold text-base">
            No Matching Records found
          </p>
        </div>
      </td>
    </tr>
  );
}

function TableError({ columns = 9 }: { colSpan?: number; columns?: number }) {
  return (
    <div className="rounded-lg border">
      <Table className="w-full ">
        <TableHeader className="bg-[#F9FAFB] dark:bg-transparent h-16">
          <tr>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <th
                key={`error-header-${colIndex}`}
                className="px-2 py-4 align-middle whitespace-nowrap"
              ></th>
            ))}
          </tr>
        </TableHeader>

        <tbody>
          <tr>
            <td colSpan={columns} className="p-0 h-[300px]">
              <div className="flex flex-col items-center justify-center h-full w-full py-20">
                <div className="rounded-full bg-red-300 p-2">
                  <div className="rounded-full border-[6px] border-red-500/20 p-2">
                    <BugIcon weight="fill" className="w-8 h-8" />
                  </div>
                </div>
                <p className="text-neutral-400 font-bold text-base">
                  An unknown Error occurred
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

function TableSkeleton({
  count = 8,
  columns = 9,
}: {
  count?: number;
  columns?: number;
}) {
  return (
    <div className="rounded-lg border">
      <Table className="w-full">
        <TableHeader className="bg-[#F9FAFB] dark:bg-transparent h-16 ">
          <tr>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <th
                key={`skeleton-header-${colIndex}`}
                className="px-2 py-4 align-middle whitespace-nowrap"
              >
                <Skeleton className="h-4 w-24" />
              </th>
            ))}
          </tr>
        </TableHeader>

        <tbody>
          {Array.from({ length: count }).map((_, rowIndex) => (
            <tr key={`skeleton-row-${rowIndex}`}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td
                  key={`skeleton-cell-${rowIndex}-${colIndex}`}
                  className="px-2 py-4 align-middle whitespace-nowrap"
                >
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        <TableFooter>
          <tr>
            <td colSpan={columns} className="text-center py-6">
              <Skeleton className="h-8 w-40 mx-auto" />
            </td>
          </tr>
        </TableFooter>
      </Table>
    </div>
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableSkeleton,
  TableEmpty,
  TableError,
};
