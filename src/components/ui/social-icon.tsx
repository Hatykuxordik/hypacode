import Link from "next/link";

function SocialIcon({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ElementType;
}) {
  return (
    <Link
      href={href}
      className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </Link>
  );
}

export { SocialIcon };
