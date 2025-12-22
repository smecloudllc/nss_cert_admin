/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PaginatedAPIDataInterface<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface FiltersInterface {
  type?: string;
  filters?: {
    country_id?: number;
    kyc_status?: "verified" | "not verified" | "pending" | string;
    search?: string;
    date_range?: [string, string];
    status?: "completed" | "pending" | "cancelled" | string;
    trans_type?: "deposit" | "withdrawal";
    username?: string;
    currency?: "GHS" | "NGN" | string;
    tags?: string[];
    locale?: string;
    interests?: string[];
    service_name?: string;
    deleted?: boolean;
    suspended?: boolean;
    banned?: boolean;
    service_type__id?: number;
    signup_source?: string;
    // more to come
  } | null;
  drop?: number;
}

export type TableViewInterface =
  | "loading"
  | "populated"
  | "empty"
  | "no-records";

// Possible user roles
export type UserRole =
  | "finance"
  | "marketing"
  | "operations"
  | "super"
  | "writer";

// Base API response structure
export interface BaseApiResponse<T = any> {
  success: boolean;
  info: T;
}

// Pagination structure
export interface Paginator {
  items: number;
  total_items: number;
  previous_page: number;
  next_page: number;
  next: boolean;
  prev: boolean;
}

// API response with optional pagination
export interface PaginatedApiResponse<T = any> extends BaseApiResponse<T> {
  paginator?: Paginator;
}

// Countries
export type CountryType = {
  success: boolean;
  info: [
    {
      id: number;
      name: string;
      image: string;
      short_name: string;
      phone_code: string;
      currency: string;
      currency_code: string;
      currency_supported: boolean;
      signup_sources?: string[] | undefined;
    }
  ];
};

export type LanguageType = {
  success: boolean;
  info: [
    {
      id: number;
      name: string;
      short_code: string;
      image: string;
    }
  ];
};

export interface ServiceInfo {
  name: string;
  image: string;
}

export type PaymentServiceResponse = BaseApiResponse<ServiceInfo[]>;

export interface ServiceInfo {
  id: number;
  name: string;
  color: string;
  image: string;
  enabled: boolean;
  fees_applicable: boolean;
  purpose: "withdrawal" | "deposit";
  category: "subscription" | "utility" | "wallet transfer";
}

export type ServiceResponse = BaseApiResponse<ServiceInfo[]>;

export interface DecodedDataType {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  reference?: string;
}
