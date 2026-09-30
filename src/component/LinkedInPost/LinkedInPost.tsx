interface LinkedInPostProps {
  postUrl?: string;
  className?: string;
}

export function LinkedInPost({
  postUrl = "https://www.linkedin.com/embed/feed/update/urn:li:share:7496237227417616385",
  className = "",
}: LinkedInPostProps) {
  return (
    <div
      className={`w-full max-w-[504px] mx-auto overflow-hidden rounded-2xl border border-[#2f2923] bg-[#161311] hover:border-[#d9a55b]/40 transition-colors duration-300 ${className}`}
    >
      <iframe
        src={postUrl}
        title="Embedded post"
        className="block w-full border-0"
        style={{ height: "775px" }}
        allowFullScreen
      />
    </div>
  );
}
