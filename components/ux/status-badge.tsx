import React from "react";

interface StatusBadgeProps {
  status:
    | "active"
    | "inactive"
    | "suspended"
    | "invalid"
    | "pending"
    | "super"
    | "marketing"
    | "operations"
    | "finance"
    | "regular"
    | "not_verified"
    | "not_suspended"
    | "cancelled"
    | "completed"
    | "verified"
    | "withdrawal"
    | "deposit"
    | "banned"
    | "notdeleted"
    | "deleted"
    | string;
}

const statusMap = {
  active: {
    label: "Active",
    dot: "bg-green-500",
    badge: "bg-green-100 text-green-800 border-green-200",
  },
  withdrawal: {
    label: "Withdrawal",
    dot: "bg-purple-500",
    badge: "bg-purple-100 text-purple-800 border-purple-200",
  },
  deposit: {
    label: "Deposit",
    dot: "bg-cyan-500",
    badge: "bg-cyan-100 text-cyan-800 border-cyan-200",
  },
  completed: {
    label: "Completed",
    dot: "bg-green-500",
    badge: "bg-green-100 text-green-800 border-green-200",
  },
  verified: {
    label: "Verified",
    dot: "bg-green-500",
    badge: "bg-green-100 text-green-800 border-green-200",
  },
  inactive: {
    label: "Inactive",
    dot: "bg-gray-400",
    badge: "bg-gray-100 text-gray-700 border-gray-200",
  },
  not_suspended: {
    label: "Not Suspended",
    dot: "bg-green-400",
    badge: "bg-green-100 text-green-700 border-green-200",
  },
  suspended: {
    label: "Suspended",
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-800 border-red-200",
  },
  banned: {
    label: "Banned",
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-800 border-red-200",
  },
  not_banned: {
    label: "Not Banned",
    dot: "bg-neutral-500",
    badge: "bg-neutral-100 text-neutral-800 border-neutral-200",
  },
  cancelled: {
    label: "Cancelled",
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-800 border-red-200",
  },
  invalid: {
    label: "Invalid",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
  },
  pending: {
    label: "Pending",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
  },
  not_verified: {
    label: "Not Verified",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
  },
  super: {
    label: "Super",
    dot: "bg-blue-500",
    badge: "bg-blue-100 text-blue-800 border-blue-200",
  },
  marketing: {
    label: "Marketing",
    dot: "bg-purple-500",
    badge: "bg-purple-100 text-purple-800 border-purple-200",
  },
  operations: {
    label: "Operations",
    dot: "bg-green-500",
    badge: "bg-green-100 text-green-800 border-green-200",
  },
  notdeleted: {
    label: "Active",
    dot: "bg-green-500",
    badge: "bg-green-100 text-green-800 border-green-200",
  },
  deleted: {
    label: "Deleted",
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-800 border-red-200",
  },
  finance: {
    label: "Finance",
    dot: "bg-yellow-500",
    badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  writer: {
    label: "Writer",
    dot: "bg-fuchsia-500",
    badge: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  },
  regular: {
    label: "Regular",
    dot: "bg-neutral-500",
    badge: "bg-neutral-100 text-neutral-800 border-neutral-200",
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { label, dot, badge } =
    statusMap[status as keyof typeof statusMap] || statusMap["invalid"];

  return (
    <span
      className={`py-0.5 px-2 border rounded-full text-xs font-medium inline-flex items-center gap-1 ${badge}`}
    >
      <span className={`w-2 h-2 rounded-full mr-1 ${dot}`} />
      {label}
    </span>
  );
};

export default StatusBadge;
