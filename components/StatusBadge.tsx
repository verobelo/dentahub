import { StatusIcon } from "@/constants";
import clsx from "clsx";
import Image from "next/image";

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <div
      className={clsx("flex w-fit items-center gap-2 rounded-full px-4 py-2", {
        "bg-green-600": status === "scheduled",
        "bg-blue-600": status === "pending",
        "bg-red-600": status === "cancelled",
      })}
    >
      <Image
        src={StatusIcon[status]}
        width={24}
        height={24}
        alt={status}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-xs font-semibold leading-[16px] capitalize", {
          "text-green-500": status === "scheduled",
          "text-blue-500": status === "pending",
          "text-red-500": status === "cancelled",
        })}
      >
        {status}
      </p>
    </div>
  );
}
