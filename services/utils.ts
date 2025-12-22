import {
  CountryType,
  LanguageType,
  PaymentServiceResponse,
  ServiceResponse,
} from "@/interfaces";
import { http } from "@/utils/axios/http";

export const getCountries = () => http.get<CountryType>(`base/countries/`);
export const getLanguages = () => http.get<LanguageType>(`base/languages/`);
export const getPaymentServices = () =>
  http.get<PaymentServiceResponse>(`base/services/`);
export const getServices = () =>
  http.get<ServiceResponse>(`base/service_types/`);
