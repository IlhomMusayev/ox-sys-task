import { ApartmentOutlined, DashboardOutlined } from "@ant-design/icons";

export const NavigationConstants: NavigationType[] = [
  {
    key: "/",
    icon: "DashboardOutlined",
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
