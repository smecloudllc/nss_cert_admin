// components/cards/printed-certificates-card.tsx
import { TrendingDown, TrendingUpIcon } from "lucide-react";
import { UiCard } from "@/components/ui";

interface CardProps {
  value: number;
  percentage_change: number;
}

export function PrintedCertificatesCard({
  value,
  percentage_change,
}: CardProps) {
  return (
    <div className="min-w-0">
      <section>
        <UiCard.Card className="shadow-xs">
          <UiCard.CardHeader>
            <UiCard.CardTitle className="font-bold">
              Printed Certificates
            </UiCard.CardTitle>
            <UiCard.CardDescription className="truncate">
              Certificates printed this period
            </UiCard.CardDescription>
          </UiCard.CardHeader>

          <UiCard.CardContent className="font-bold text-xl md:text-2xl lg:text-3xl font-mono">
            {value.toLocaleString()}
          </UiCard.CardContent>

          <UiCard.CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 items-center">
              {percentage_change > 0 ? (
                <div className="flex items-center gap-1">
                  <span className="">Up {percentage_change}%</span>
                  <TrendingUpIcon className="h-5 w-5 text-green-400 animate-pulse" />
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span className="">Down {Math.abs(percentage_change)}%</span>
                  <TrendingDown className="h-5 w-5 text-red-500 animate-pulse" />
                </div>
              )}
            </div>
          </UiCard.CardFooter>
        </UiCard.Card>
      </section>
    </div>
  );
}
