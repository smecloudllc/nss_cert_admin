import React from "react";

interface PillProps {
  status: "regular" | "exemption" | string;
}

const statusMap = {
  regular: {
    label: "Regular",
    badge: "bg-blue-100 text-blue-800 border-blue-200",
  },
  exemption: {
    label: "Exemption",
    badge: "bg-purple-100 text-purple-800 border-purple-200",
  },
};

const Pill: React.FC<PillProps> = ({ status }) => {
  const { label, badge } =
    statusMap[status as keyof typeof statusMap] || statusMap["regular"];

  return (
    <span
      className={`py-1 px-3 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${badge}`}
    >
      {label}
    </span>
  );
};

export default Pill;
