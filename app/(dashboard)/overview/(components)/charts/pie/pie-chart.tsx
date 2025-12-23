"use client";

import * as React from "react";
import { Label, Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { UiCard } from "@/components/ui";

interface PieChartCardProps {
  title: string;
  data: { name: string; value: number; fill: string }[];
  description?: string;
}

export function PieChartCard({
  title,
  data,
  description = "",
}: PieChartCardProps) {
  const total = React.useMemo(
    () => data.reduce((acc, curr) => acc + curr.value, 0),
    [data]
  );

  const chartConfig: ChartConfig = {
    total: {
      label: title,
    },
  };

  return (
    <UiCard.Card className="flex flex-col shadow-xs">
      <UiCard.CardHeader className="items-center pb-0">
        <UiCard.CardTitle>{title}</UiCard.CardTitle>
      </UiCard.CardHeader>

      <UiCard.CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) =>
                  viewBox && "cx" in viewBox && "cy" in viewBox ? (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {total.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 20}
                        className="fill-muted-foreground text-xs"
                      >
                        Total
                      </tspan>
                    </text>
                  ) : null
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </UiCard.CardContent>

      {data.length > 0 && (
        <UiCard.CardFooter className="flex flex-wrap gap-2 text-sm">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="font-medium">{entry.name}</span>
              <span className="text-muted-foreground">
                ({entry.value.toLocaleString()})
              </span>
            </div>
          ))}
        </UiCard.CardFooter>
      )}

      {description && (
        <UiCard.CardFooter className="text-muted-foreground text-xs pt-1">
          {description}
        </UiCard.CardFooter>
      )}
    </UiCard.Card>
  );
}
