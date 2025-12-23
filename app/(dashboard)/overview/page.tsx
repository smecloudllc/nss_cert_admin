"use client";
import { UiLayout } from "@/components/ui";
import { TotalCertificatesCard } from "./(components)/cards/total-certificates";
import { PrintedCertificatesCard } from "./(components)/cards/printed-certificates";
import { DeliveredCertificatesCard } from "./(components)/cards/delivered-certificates";
import { PendingActionsCard } from "./(components)/cards/pending-actions";
import { CertificateActivityChart } from "./(components)/charts/line/line-chart";
import { PieChartCard } from "./(components)/charts/pie/pie-chart";

export default function Page() {
  return (
    <UiLayout.Layout
      header="Overview"
      canAccess={true}
      subHeading="A visual overview of all statistics and data"
      className="min-h-screen"
    >
      <div className="w-full flex flex-col space-y-4">
        {" "}
        {/* Add explicit full width */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <TotalCertificatesCard {...mockCards.total} />
          <PrintedCertificatesCard {...mockCards.printed} />
          <DeliveredCertificatesCard {...mockCards.delivered} />
          <PendingActionsCard {...mockCards.pending} />
        </div>
        {/* pie chart */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PieChartCard
              data={certificateTypeData}
              title="Certificates by Type"
            />
            <PieChartCard data={deliveryStatusData} title="Delivery Status" />
            <PieChartCard
              data={regionOfServiceData}
              title="Certificates by Region"
            />
          </div>
        </div>
        {/* Line chart */}
        <div>
          <CertificateActivityChart />
        </div>
      </div>
    </UiLayout.Layout>
  );
}

const mockCards = {
  total: { value: 9995, percentage_change: 8.2 },
  printed: { value: 8496, percentage_change: 5.4 },
  delivered: { value: 7765, percentage_change: 6.1 },
  pending: { value: 2230, percentage_change: -3.7 },
};

// 1. Delivery Status
const deliveryStatusData = [
  { name: "Delivered", value: 7765, fill: "#2b9348" },
  { name: "In Transit", value: 1000, fill: "var(--chart-2)" },
  { name: "Pending", value: 2230, fill: "var(--chart-3)" },
  { name: "Failed", value: 0, fill: "var(--chart-4)" },
];

// 2. Certificate Type
const certificateTypeData = [
  { name: "Regular", value: 7000, fill: "#2b9348" },
  { name: "Exemption", value: 2995, fill: "var(--chart-2)" },
];

// 3. Region of Service
const regionOfServiceData = [
  { name: "Greater Accra", value: 5000, fill: "#2b9348" },
  { name: "Ashanti", value: 2500, fill: "var(--chart-2)" },
  { name: "Central", value: 1000, fill: "var(--chart-3)" },
  { name: "Northern", value: 750, fill: "var(--chart-4)" },
  { name: "Other Regions", value: 745, fill: "var(--chart-5)" },
];
