//? import icons
import DashboardIcon from "&/assets/svg/dashboard.svg";
import User from "&/assets/svg/user.svg";
import RealEstate from "&/assets/svg/realestate.svg";
import Order from "&/assets/svg/order.svg";
import Apartment from "&/assets/svg/apartment.svg";
import Report from "&/assets/svg/report.svg";

export const AdminUl = [
  {
    id: 1,
    label: "Dashboard",
    icon: <DashboardIcon className="svgIconAdminActive" />,
    url: "#",
  },
  {
    id: 2,
    label: "Users",
    icon: <User className="svgIconAdmin" />,
    url: "#",
  },
  {
    id: 3,
    label: "Properties",
    icon: <RealEstate className="svgIconAdmin" />,
    url: "#",
  },
  {
    id: 4,
    label: "Orders",
    icon: <Order className="svgIconAdmin" />,
    url: "#",
  },
  {
    id: 5,
    label: "Projects",
    icon: <Apartment className="svgIconAdmin" />,
    url: "#",
  },
  {
    id: 6,
    label: "Reports",
    icon: <Report className="svgIconAdmin" />,
    url: "#",
  },
];
