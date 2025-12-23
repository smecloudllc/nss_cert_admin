"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { UiCard } from "@/components/ui";

export const description = "Certificate activity over time";

export const chartData = [
  { date: "2024-04-01", issued: 180, delivered: 120 },
  { date: "2024-04-02", issued: 220, delivered: 150 },
  { date: "2024-04-03", issued: 195, delivered: 160 },
  { date: "2024-04-04", issued: 260, delivered: 210 },
  { date: "2024-04-05", issued: 310, delivered: 245 },
  { date: "2024-04-06", issued: 280, delivered: 260 },
  { date: "2024-04-07", issued: 240, delivered: 200 },
  { date: "2024-04-08", issued: 330, delivered: 290 },
  { date: "2024-04-09", issued: 170, delivered: 140 },
  { date: "2024-04-10", issued: 290, delivered: 230 },
  { date: "2024-04-11", issued: 340, delivered: 300 },
  { date: "2024-04-12", issued: 310, delivered: 260 },
  { date: "2024-04-13", issued: 360, delivered: 320 },
  { date: "2024-04-14", issued: 210, delivered: 190 },
  { date: "2024-04-15", issued: 260, delivered: 220 },
  { date: "2024-04-16", issued: 300, delivered: 250 },
  { date: "2024-04-17", issued: 420, delivered: 360 },
  { date: "2024-04-18", issued: 390, delivered: 340 },
  { date: "2024-04-19", issued: 280, delivered: 240 },
  { date: "2024-04-20", issued: 190, delivered: 170 },
  { date: "2024-04-21", issued: 230, delivered: 200 },
  { date: "2024-04-22", issued: 310, delivered: 270 },
  { date: "2024-04-23", issued: 260, delivered: 230 },
  { date: "2024-04-24", issued: 380, delivered: 330 },
  { date: "2024-04-25", issued: 340, delivered: 300 },
  { date: "2024-04-26", issued: 210, delivered: 180 },
  { date: "2024-04-27", issued: 410, delivered: 360 },
  { date: "2024-04-28", issued: 260, delivered: 230 },
  { date: "2024-04-29", issued: 330, delivered: 290 },
  { date: "2024-04-30", issued: 460, delivered: 400 },
];

const chartConfig = {
  issued: {
    label: "Certificates Issued",
    color: "var(--chart-1)",
  },
  delivered: {
    label: "Certificates Delivered",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function CertificateActivityChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("issued");

  const total = React.useMemo(
    () => ({
      issued: chartData.reduce((acc, curr) => acc + curr.issued, 0),
      delivered: chartData.reduce((acc, curr) => acc + curr.delivered, 0),
    }),
    []
  );

  return (
    <UiCard.Card className="shadow-xs">
      <UiCard.CardHeader className="flex flex-col items-stretch border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 ">
          <UiCard.CardTitle>Certificate Activity</UiCard.CardTitle>
          <UiCard.CardDescription>
            Daily issued vs delivered certificates (last 30 days)
          </UiCard.CardDescription>
        </div>

        <div className="flex">
          {(["issued", "delivered"] as const).map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-l px-6 py-4 text-left"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-muted-foreground text-xs">
                {chartConfig[key].label}
              </span>
              <span className="text-lg font-bold sm:text-3xl">
                {total[key].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </UiCard.CardHeader>

      <UiCard.CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </UiCard.CardContent>
    </UiCard.Card>
  );
}
