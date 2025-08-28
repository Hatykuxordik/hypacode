import { usePathname } from "next/navigation";
import { navigation } from "./data/navigation";
import { NavItem } from "./nav-item";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navigation.map((item) => (
        <NavItem
          key={item.name}
          item={item}
          isActive={
            pathname === item.href || pathname.startsWith(item.href + "/")
          }
        />
      ))}
    </nav>
  );
}
