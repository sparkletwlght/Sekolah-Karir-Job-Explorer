export default function BookmarkIcon({
  isSaved,
  fillColor = "#F59E0B",
  strokeColor = "#1E293B",
  size = 17
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isSaved ? fillColor : "none"}
      stroke={isSaved ? fillColor : strokeColor}
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transition: "all 0.2s ease", display: "block" }}
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}
