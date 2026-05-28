import { Book, BriefcaseBusinessIcon, Home, User } from "lucide-react-native";

export const BOTTOM_TABS = [
  { label: "Home", name: "home", icon: Home, route: "/home" },
  { label: "Orders", name: "orders", icon: Book, route: "/orders" },
  {
    label: "Holdings",
    name: "portfolio",
    icon: BriefcaseBusinessIcon,
    route: "/portfolio",
  },
  { label: "Profile", name: "profile", icon: User, route: "/profile" },
] as const;

export const getBottomTabIndex = (pathname: string) => {
  return BOTTOM_TABS.findIndex(
    (tab) => pathname === tab.route || pathname.startsWith(`${tab.route}/`),
  );
};
