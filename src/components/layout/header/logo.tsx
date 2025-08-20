import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-1 group">
      <Image
        src="/assets/Hypacodelogo.svg"
        alt="Hypacode Logo"
        width={40}
        height={40}
        className="h-8 w-8 transition-transform group-hover:scale-110"
      />
      <span className="text-xl font-bold bg-primary bg-clip-text text-transparent">
        Hypacode
      </span>
    </Link>
  );
}
