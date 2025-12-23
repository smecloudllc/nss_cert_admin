/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronRight, EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import dayjs from "dayjs";

import { UiDropdownMenu, UiTable } from "@/components/ui";
import { UserCircleIcon } from "@phosphor-icons/react";
import StatusBadge from "@/components/ux/status-badge";
// import { UsersResponse } from "@/models/user/user";
import Paginator from "@/components/ux/paginator";
import { FiltersInterface } from "@/interfaces";
import { routes } from "@/routes";
import Image from "next/image";
import Pill from "@/components/ux/pill";
import ViewCertificateSheet from "../view-certificate";

// -- WORK ON TYPE AND INTERFACE --
// Props

interface Props {
  certificate?: any;
  error?: any;
  isLoading?: boolean;
  setFilters: React.Dispatch<React.SetStateAction<FiltersInterface>>;
  filters: FiltersInterface;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setUserAction?: React.Dispatch<
    React.SetStateAction<{
      type?: "ban" | "suspend" | string;
      username?: string;
      open: boolean;
    }>
  >;
}

export default function CertificateDesktopTable({
  certificate,

  filters,
  setFilters,
  page,
  setPage,
}: //   setUserAction,
Props) {
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [selectedCertificate, setSelectedCertificate] = React.useState(
    certificateData[0]
  );

  /**
   * Hooks
   */
  const router = useRouter();

  /**
   * Contatnst
   */

  const next = certificate?.paginator?.next;
  const prev = certificate?.paginator?.prev;
  const items = certificate?.paginator?.items;
  const total = certificate?.paginator?.total_items;

  return (
    <div>
      <div className="rounded-lg border mt-2 ">
        <UiTable.Table className="">
          <UiTable.TableHeader className="bg-[#F9FAFB] dark:bg-transparent h-16 ">
            <UiTable.TableRow>
              <UiTable.TableHead className="dark:text-neutral-300 font-semibold pl-4">
                Certificate ID
              </UiTable.TableHead>
              <UiTable.TableHead className="dark:text-neutral-300 font-semibold">
                Full Name
              </UiTable.TableHead>
              <UiTable.TableHead className="dark:text-neutral-300 font-semibold">
                Region
              </UiTable.TableHead>
              <UiTable.TableHead className="dark:text-neutral-300 font-semibold">
                Courier
              </UiTable.TableHead>
              <UiTable.TableHead className="dark:text-neutral-300 font-semibold">
                Certificate Type
              </UiTable.TableHead>

              <UiTable.TableHead className="dark:text-neutral-300 font-semibold">
                Service Details
              </UiTable.TableHead>
              <UiTable.TableHead className="dark:text-neutral-300 font-semibold">
                Print Status
              </UiTable.TableHead>

              <UiTable.TableHead className="dark:text-neutral-300 font-semibold">
                Qualification
              </UiTable.TableHead>
              <UiTable.TableHead className="dark:text-neutral-300 font-semibold">
                Date Printed
              </UiTable.TableHead>
              <UiTable.TableHead className="dark:text-neutral-300 font-semibold">
                Actions
              </UiTable.TableHead>
            </UiTable.TableRow>
          </UiTable.TableHeader>
          <UiTable.TableBody>
            {certificate?.length === 0 && <UiTable.TableEmpty colSpan={10} />}

            {certificateData?.map((cet, index) => (
              <UiTable.TableRow key={index} className="">
                <UiTable.TableCell className=" gap-2 pl-4 font-semibold truncate pr-10">
                  {cet.certificate_id ?? "---"}
                </UiTable.TableCell>
                <UiTable.TableCell className="text-gray-500 dark:text-neutral-300 truncate pr-10">
                  {" "}
                  <p className="font-semibold">{cet.firstname ?? "---"}</p>
                  <p className="font-semibold">{cet.lastname ?? "---"}</p>
                </UiTable.TableCell>

                <UiTable.TableCell className="uppercase font-semibold pr-10">
                  {cet.region_of_service ?? "---"}
                </UiTable.TableCell>
                <UiTable.TableCell className="font-semibold pr-10">
                  {cet.courier ?? "---"}
                </UiTable.TableCell>
                <UiTable.TableCell className="pr-20">
                  <Pill status={cet.certificate_type.toLowerCase()} />
                </UiTable.TableCell>

                <UiTable.TableCell className="text-gray-500 dark:text-neutral-300 pr-10">
                  <p className="font-bold">{cet.place_of_service ?? "---"}</p>
                  <p className="">Year: {cet.year_of_service ?? "---"}</p>
                  <p className="font-bold"> {cet.nss_number ?? "---"}</p>
                </UiTable.TableCell>

                <UiTable.TableCell className="pr-10">
                  <StatusBadge status={cet.print_status} />
                </UiTable.TableCell>

                <UiTable.TableCell
                  className="pr-10 font-semibold truncate max-w-[200px]"
                  title={cet.qualification}
                >
                  {cet.qualification}
                </UiTable.TableCell>

                <UiTable.TableCell className="pr-10">
                  {dayjs(cet.print_date).format("DD MMM YYYY - h:mm A")}
                </UiTable.TableCell>
                <UiTable.TableCell>
                  <UiDropdownMenu.DropdownMenu>
                    <UiDropdownMenu.DropdownMenuTrigger
                      aria-label="Open actions"
                      className="border p-2 rounded-md bg-gray-100"
                    >
                      <EllipsisVertical className="h-4 w-4 text-neutral-900" />
                    </UiDropdownMenu.DropdownMenuTrigger>
                    <UiDropdownMenu.DropdownMenuContent>
                      <UiDropdownMenu.DropdownMenuItem
                        className="font-semibold"
                        onClick={() => {
                          setSelectedCertificate(cet);
                          setSheetOpen(true);
                        }}
                      >
                        View Details
                      </UiDropdownMenu.DropdownMenuItem>

                      <UiDropdownMenu.DropdownMenuItem
                        className="text-green-600 font-semibold"
                        onClick={() => {}}
                      >
                        Track Certificate
                      </UiDropdownMenu.DropdownMenuItem>
                    </UiDropdownMenu.DropdownMenuContent>
                  </UiDropdownMenu.DropdownMenu>
                </UiTable.TableCell>
              </UiTable.TableRow>
            ))}
          </UiTable.TableBody>
          <UiTable.TableFooter>
            <UiTable.TableRow>
              <UiTable.TableCell colSpan={10} className="text-center">
                <div className="mt-6 ">
                  {/* pagination */}
                  <Paginator
                    items={items ?? 0}
                    filters={filters}
                    setFilters={setFilters}
                    page={page}
                    setPage={setPage}
                    next={next}
                    prev={prev}
                    total={total}
                  />
                </div>
              </UiTable.TableCell>
            </UiTable.TableRow>
          </UiTable.TableFooter>
        </UiTable.Table>
      </div>

      {selectedCertificate && (
        <ViewCertificateSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          certificate={selectedCertificate}
        />
      )}
    </div>
  );
}

// ARRAY
const certificateData = [
  {
    certificate_id: "CERT-2024-0001",
    date_added: "2024-08-01",
    last_updated: "2024-10-12",
    courier: "DHL Ghana",
    delivery_status: "Delivered",
    firstname: "Kelvin",
    lastname: "Mensah",
    region_of_service: "Greater Accra",
    district: "Ablekuma West",
    certificate_type: "Regular",
    print_status: "printed",
    batch_reference: "BATCH-ACC-2024-01",
    request_number: "REQ-10001",
    nss_number: "NSS/GA/24/0001",
    year_of_service: "2023/2024",
    place_of_service: "TechNova Solutions Ltd",
    qualification: "BSc Computer Science",
    print_date: "2024-10-05",
    institution: "University of Ghana",
  },
  {
    certificate_id: "CERT-2024-0002",
    date_added: "2024-08-03",
    last_updated: "2024-10-15",
    courier: "Ghana Post",
    delivery_status: "In Transit",
    firstname: "Abena",
    lastname: "Owusu",
    region_of_service: "Ashanti",
    district: "Kumasi Metro",
    certificate_type: "Exemption",
    print_status: "not_printed",
    batch_reference: "BATCH-ASH-2024-01",
    request_number: "REQ-10002",
    nss_number: "NSS/ASH/23/0142",
    year_of_service: "2022/2023",
    place_of_service: "Kumasi Metropolitan Assembly",
    qualification: "BA Sociology",
    print_date: "2024-10-06",
    institution: "Kwame Nkrumah University of Science and Technology",
  },
  {
    certificate_id: "CERT-2024-0003",
    date_added: "2024-08-05",
    last_updated: "2024-10-18",
    courier: "FedEx",
    delivery_status: "Pending",
    firstname: "Yaw",
    lastname: "Boateng",
    region_of_service: "Eastern",
    district: "New Juaben South",
    certificate_type: "Regular",
    print_status: "pending",
    batch_reference: "BATCH-EAST-2024-01",
    request_number: "REQ-10003",
    nss_number: "NSS/EAST/24/0321",
    year_of_service: "2023/2024",
    place_of_service: "Koforidua Technical University",
    qualification: "BTech Information Technology",
    print_date: null,
    institution: "Koforidua Technical University",
  },
  {
    certificate_id: "CERT-2024-0004",
    date_added: "2024-08-07",
    last_updated: "2024-10-20",
    courier: "DHL Ghana",
    delivery_status: "Delivered",
    firstname: "Ama",
    lastname: "Asante",
    region_of_service: "Central",
    district: "Cape Coast Metro",
    certificate_type: "Regular",
    print_status: "printed",
    batch_reference: "BATCH-CEN-2024-01",
    request_number: "REQ-10004",
    nss_number: "NSS/CEN/24/0089",
    year_of_service: "2023/2024",
    place_of_service: "Cape Coast Teaching Hospital",
    qualification: "BSc Nursing",
    print_date: "2024-10-08",
    institution: "University of Cape Coast",
  },
  {
    certificate_id: "CERT-2024-0005",
    date_added: "2024-08-10",
    last_updated: "2024-10-22",
    courier: "GIG Logistics",
    delivery_status: "Delivered",
    firstname: "Joseph",
    lastname: "Addo",
    region_of_service: "Western",
    district: "Sekondi-Takoradi Metro",
    certificate_type: "Regular",
    print_status: "not_printed",
    batch_reference: "BATCH-WEST-2024-01",
    request_number: "REQ-10005",
    nss_number: "NSS/WEST/24/0177",
    year_of_service: "2023/2024",
    place_of_service: "Takoradi Port Authority",
    qualification: "BSc Logistics and Supply Chain",
    print_date: "2024-10-09",
    institution: "University of Education, Winneba",
  },
  {
    certificate_id: "CERT-2024-0006",
    date_added: "2024-08-12",
    last_updated: "2024-10-25",
    courier: "DHL Ghana",
    delivery_status: "In Transit",
    firstname: "Priscilla",
    lastname: "Darko",
    region_of_service: "Volta",
    district: "Ho Municipal",
    certificate_type: "Exemption",
    print_status: "printed",
    batch_reference: "BATCH-VOL-2024-01",
    request_number: "REQ-10006",
    nss_number: "NSS/VOL/22/0045",
    year_of_service: "2021/2022",
    place_of_service: "Volta Regional Coordinating Council",
    qualification: "BA Public Administration",
    print_date: "2024-10-10",
    institution: "University of Professional Studies, Accra",
  },
  {
    certificate_id: "CERT-2024-0007",
    date_added: "2024-08-14",
    last_updated: "2024-10-27",
    courier: "Ghana Post",
    delivery_status: "Pending",
    firstname: "Daniel",
    lastname: "Agyeman",
    region_of_service: "Bono",
    district: "Sunyani Municipal",
    certificate_type: "Regular",
    print_status: "pending",
    batch_reference: "BATCH-BONO-2024-01",
    request_number: "REQ-10007",
    nss_number: "NSS/BONO/24/0066",
    year_of_service: "2023/2024",
    place_of_service: "Sunyani Municipal Assembly",
    qualification: "BSc Economics",
    print_date: null,
    institution: "University for Development Studies",
  },
  {
    certificate_id: "CERT-2024-0008",
    date_added: "2024-08-16",
    last_updated: "2024-10-29",
    courier: "FedEx",
    delivery_status: "Delivered",
    firstname: "Esi",
    lastname: "Quartey",
    region_of_service: "Greater Accra",
    district: "La Dade-Kotopon",
    certificate_type: "Regular",
    print_status: "printed",
    batch_reference: "BATCH-ACC-2024-02",
    request_number: "REQ-10008",
    nss_number: "NSS/GA/24/0198",
    year_of_service: "2023/2024",
    place_of_service: "Ministry of Communications",
    qualification: "BSc Information Systems",
    print_date: "2024-10-12",
    institution: "Ashesi University",
  },
  {
    certificate_id: "CERT-2024-0009",
    date_added: "2024-08-18",
    last_updated: "2024-11-01",
    courier: "GIG Logistics",
    delivery_status: "In Transit",
    firstname: "Michael",
    lastname: "Kwarteng",
    region_of_service: "Northern",
    district: "Tamale Metro",
    certificate_type: "Regular",
    print_status: "printed",
    batch_reference: "BATCH-NOR-2024-01",
    request_number: "REQ-10009",
    nss_number: "NSS/NOR/24/0123",
    year_of_service: "2023/2024",
    place_of_service: "Tamale Teaching Hospital",
    qualification: "BSc Health Information Management",
    print_date: "2024-10-13",
    institution: "University for Development Studies",
  },
  {
    certificate_id: "CERT-2024-0010",
    date_added: "2024-08-20",
    last_updated: "2024-11-03",
    courier: "DHL Ghana",
    delivery_status: "Delivered",
    firstname: "Linda",
    lastname: "Ofori",
    region_of_service: "Eastern",
    district: "Akuapem North",
    certificate_type: "Exemption",
    print_status: "printed",
    batch_reference: "BATCH-EAST-2024-02",
    request_number: "REQ-10010",
    nss_number: "NSS/EAST/21/0021",
    year_of_service: "2020/2021",
    place_of_service: "Aburi Botanical Gardens",
    qualification: "BSc Environmental Science",
    print_date: "2024-10-14",
    institution: "University of Energy and Natural Resources",
  },
];
