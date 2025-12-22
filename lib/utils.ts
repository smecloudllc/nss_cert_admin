import isYesterday from "dayjs/plugin/isYesterday";
import { clsx, type ClassValue } from "clsx";
import calendar from "dayjs/plugin/calendar";
import isToday from "dayjs/plugin/isToday";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import _ from "lodash";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatToLocalString = (value: number) => {
  return value.toLocaleString();
};

// Add this function at the top of your component or in a utils file
// export const convertFileToBase64 = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = () => {
//       if (typeof reader.result === "string") {
//         // Remove the data:image/jpeg;base64, prefix if your API doesn't need it
//         const base64 = reader.result.split(",")[1];
//         resolve(base64);
//       } else {
//         reject(new Error("Failed to convert file to base64"));
//       }
//     };

//     reader.onerror = () => {
//       reject(new Error("Failed to read file"));
//     };

//     reader.readAsDataURL(file);
//   });
// };

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        // Keep the entire Data URL (includes MIME + base64)
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));

    reader.readAsDataURL(file);
  });
};

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(calendar);

// Helper function for date and time  for chats
export function formatChatDate(date: string | Date) {
  const d = dayjs(date);

  if (d.isToday()) {
    return d.format("HH:mm"); // just show time
  }

  if (d.isYesterday()) {
    return "Yesterday";
  }

  return d.format("DD MMM YYYY - h:mm A"); // fallback: full date
}

export function getDeviceInfo() {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown Browser";
  let browserVersion = "Unknown Version";
  let osName = "Unknown OS";
  let deviceType = "Unknown Device";

  // Detect Browser
  if (
    userAgent.includes("Chrome") &&
    !userAgent.includes("Edg") &&
    !userAgent.includes("Brave")
  ) {
    browserName = "Chrome";
    const match = userAgent.match(/Chrome\/([0-9.]+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.includes("Firefox")) {
    browserName = "Firefox";
    const match = userAgent.match(/Firefox\/([0-9.]+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    browserName = "Safari";
    const match = userAgent.match(/Version\/([0-9.]+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.includes("Edg")) {
    browserName = "Edge";
    const match = userAgent.match(/Edg\/([0-9.]+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    browserName = "Opera";
    const match = userAgent.match(/(Opera|OPR)\/([0-9.]+)/);
    if (match) browserVersion = match[2];
  }

  // Detect OS
  if (userAgent.includes("Windows NT")) {
    osName = "Windows";
  } else if (userAgent.includes("Mac OS X")) {
    osName = "macOS";
  } else if (userAgent.includes("Linux")) {
    osName = "Linux";
  } else if (userAgent.includes("Android")) {
    osName = "Android";
  } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    osName = "iOS";
  }

  // Detect Device Type
  if (
    /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(userAgent)
  ) {
    deviceType = "Mobile/Tablet";
  } else {
    deviceType = "Desktop";
  }

  return {
    browser: {
      name: browserName,
      version: browserVersion,
    },
    os: osName,
    device: deviceType,
  };
}

// Data transformation for the dashboard
export function formatData(obj?: Record<string, number | string>) {
  if (!obj) return [];

  return _.orderBy(
    Object.entries(obj).map(([date, value]) => ({
      date,
      value: parseFloat(value.toString()),
    })),
    ["date"],
    ["asc"]
  );
}
// deobfuscation function
export const deobfuscateString = (encoded_scrambled_text: string) => {
  const shift_int = 36;

  try {
    // unscramble first phase
    const reverse = encoded_scrambled_text.split("").reverse();
    const phase_1_descrambled_text = encoded_scrambled_text
      .split("")
      .reverse()
      .map((char, index) => {
        const ascii_code = char.charCodeAt(0);
        const result_code = ascii_code - (index % 5);
        const new_char = `${String.fromCharCode(
          result_code === 32 ? 43 : result_code
        )}`;
        return `${new_char}`;
      })
      .join("");

    // decode
    const decoded_phase_1 = atob(phase_1_descrambled_text);

    // unscramble second phase
    const phase_2_descrambled_text = decoded_phase_1
      .split("")
      .map((char, index) => {
        const ascii_code = char.charCodeAt(0);
        const result_code = ((ascii_code - 32 - shift_int + 95) % 95) + 32;
        const new_char = String.fromCharCode(result_code);
        return new_char;
      })
      .join("");

    const descrambled_text = atob(phase_2_descrambled_text);
    return descrambled_text;
  } catch (err) {
    return undefined;
  }
};

// Numer formatter
export const formatCompactNumber = (value: number) => {
  // No compact formatting below 1000
  if (value < 10000) {
    return new Intl.NumberFormat("en-US").format(value);
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value);
};
