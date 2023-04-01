import { ApartmentOutlined, DashboardOutlined } from "@ant-design/icons";

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
];

interface NavigationType {
  key: string;
  icon: string;
  label: string;
  value: string;
}
