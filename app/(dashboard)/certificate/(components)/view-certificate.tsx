"use client";

import * as React from "react";
import { UiSheet, UiLabel } from "@/components/ui";
import StatusBadge from "@/components/ux/status-badge";
import dayjs from "dayjs";
import Pill from "@/components/ux/pill";

interface Certificate {
  certificate_id: string;
  date_added: string;
  last_updated: string;
  courier: string;
  delivery_status: string;
  firstname: string;
  lastname: string;
  region_of_service: string;
  district: string;
  certificate_type: string;
  print_status: string;
  batch_reference: string;
  request_number: string;
  nss_number: string;
  year_of_service: string;
  place_of_service: string;
  qualification: string;
  print_date: string | null;
  institution: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificate: Certificate;
}

export default function ViewCertificateSheet({
  open,
  onOpenChange,
  certificate,
}: Props) {
  return (
    <UiSheet.Sheet open={open} onOpenChange={onOpenChange}>
      <UiSheet.SheetContent className="w-full max-w-[600px] overflow-auto ">
        <UiSheet.SheetHeader>
          <UiSheet.SheetTitle>Certificate Details</UiSheet.SheetTitle>
          <UiSheet.SheetDescription>
            A detailed view of the selected certificate.
          </UiSheet.SheetDescription>
        </UiSheet.SheetHeader>

        <div className="flex flex-col h-full overflow-auto px-4 pb-10 space-y-4">
          {/* Top section */}
          <div className="flex justify-between items-center">
            <p>{dayjs(certificate.date_added).format("DD MMM YYYY")}</p>
            <p className="font-bold">
              {certificate.firstname} {certificate.lastname}
            </p>
          </div>

          {/* Status Card */}
          <section className="p-4 rounded-xl border flex flex-col lg:flex-row gap-4 justify-between">
            <div className="flex gap-3 items-center">
              <div className="rounded-full border p-2 w-10 h-10 flex justify-center items-center">
                <p className="font-bold text-sm">#</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm">
                  Certificate for{" "}
                  <span className="font-bold">
                    {certificate.place_of_service}
                  </span>
                </p>
                <span>
                  <Pill status={certificate.delivery_status} />
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="font-bold text-lg">{certificate.courier}</p>
              <p className="text-sm">Type: {certificate.certificate_type}</p>
            </div>
          </section>

          {/* Middle Details Section */}
          <section className="border rounded-xl overflow-clip">
            <div className="bg-gray-50 border-b p-2 text-neutral-600 font-medium">
              Details
            </div>
            <div className="p-4 flex flex-col space-y-4">
              {/* IDs */}
              <div className="flex justify-between items-center">
                <section className="flex flex-col space-y-1">
                  <UiLabel.Label>Certificate ID</UiLabel.Label>
                  <p className="font-mono text-sm text-neutral-500 truncate">
                    {certificate.certificate_id}
                  </p>
                </section>

                <section className="flex flex-col space-y-1">
                  <UiLabel.Label>Request Number</UiLabel.Label>
                  <p className="font-mono text-sm text-neutral-500">
                    {certificate.request_number}
                  </p>
                </section>

                <section className="flex flex-col space-y-1">
                  <UiLabel.Label>NSS Number</UiLabel.Label>
                  <p className="font-mono text-sm text-neutral-500">
                    {certificate.nss_number}
                  </p>
                </section>
              </div>

              <hr />

              {/* Service Info */}
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <section className="flex flex-col space-y-1">
                  <UiLabel.Label>Region / District</UiLabel.Label>
                  <p className="font-mono text-sm text-neutral-500">
                    {certificate.region_of_service} / {certificate.district}
                  </p>
                </section>

                <section className="flex flex-col space-y-1">
                  <UiLabel.Label>Place of Service</UiLabel.Label>
                  <p className="font-mono text-sm text-neutral-500">
                    {certificate.place_of_service}
                  </p>
                </section>

                <section className="flex flex-col space-y-1">
                  <UiLabel.Label>Institution</UiLabel.Label>
                  <p className="font-mono text-sm text-neutral-500">
                    {certificate.institution}
                  </p>
                </section>

                <section className="flex flex-col space-y-1">
                  <UiLabel.Label>Year of Service</UiLabel.Label>
                  <p className="font-mono text-sm text-neutral-500">
                    {certificate.year_of_service}
                  </p>
                </section>
              </div>

              <hr />

              {/* Qualification & Print Status */}
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                <section className="flex flex-col space-y-1">
                  <UiLabel.Label>Qualification</UiLabel.Label>
                  <p className="font-mono text-sm text-neutral-500">
                    {certificate.qualification}
                  </p>
                </section>

                <section className="flex flex-col space-y-1">
                  <UiLabel.Label>Print Status</UiLabel.Label>
                  <span>
                    <StatusBadge status={certificate.print_status} />
                  </span>
                </section>

                <section className="flex flex-col space-y-1">
                  <UiLabel.Label>Print Date</UiLabel.Label>
                  <p className="font-mono text-sm text-neutral-500">
                    {certificate.print_date
                      ? dayjs(certificate.print_date).format("DD MMM YYYY")
                      : "---"}
                  </p>
                </section>
              </div>
            </div>
          </section>
        </div>
      </UiSheet.SheetContent>
    </UiSheet.Sheet>
  );
}
