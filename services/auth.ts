/* eslint-disable @typescript-eslint/no-explicit-any */
import { clearCookies } from "@/app/auth/actions";
import { BaseApiResponse } from "@/interfaces";
import { getDeviceInfo } from "@/lib/utils";

import { http } from "@/utils/axios/http";
import { performLogout } from "@/utils/logout";
import axios from "axios";

export const logoutService = async () => {
  const deviceInfo = getDeviceInfo();
  const deviceDetails = `${deviceInfo.device} - ${deviceInfo.browser.name} - ${deviceInfo.browser.version} - ${deviceInfo.os}`;
  const response: any = await axios.post("/api/logout", {
    device: deviceDetails,
  });
  if (response.data.success) {
    clearCookies();
    performLogout();
  } else {
    throw new Error("Logout failed");
  }
};
