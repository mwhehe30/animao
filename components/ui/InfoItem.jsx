export default function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-2 min-h-[2.5rem]">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {icon && (
          <span className="text-gray-400 w-4 h-4 flex-shrink-0">{icon}</span>
        )}
        <span className="text-sm text-gray-600 truncate">{label}:</span>
      </div>
      <span
        className="text-sm font-medium text-gray-800 text-right ml-2 flex-shrink-0 max-w-[60%] truncate"
        title={value}
      >
        {value}
      </span>
    </div>
  );
}
