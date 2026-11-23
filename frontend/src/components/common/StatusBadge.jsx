
export default function StatusBadge({ active }) {
  return (
    <span
      className={`inline-flex items-center text-[10px] font-bold px-2 py-[5px] rounded-full whitespace-nowrap ${
        active
          ? "bg-green-50 text-green-700"
          : "bg-orange-50 text-orange-700"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}
