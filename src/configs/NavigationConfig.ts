export const NavigationConfig: NavigationType[] = [
  {
    key: "/",
    icon: "HomeOutlined",
    label: "Dashboard",
    value: "/dashboard",
  },
  {
    key: "/variations",
    icon: "ApartmentOutlined",
    label: "Variations",
    value: "/variations",
  },
  {
    key: "/search",
    icon: "SearchOutlined",
    label: "Search",
    value: "/search",
  },
];

interface NavigationType {
  key: string;
  icon: string;
  label: string;
  value: string;
}
