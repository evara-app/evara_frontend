//? import icons
import User from "&/assets/svg/user.svg";
import Home from "&/assets/svg/home.svg";
import Calendar from "&/assets/svg/CalendarProfile.svg";
import Eye from "&/assets/svg/eye.svg";
import Rent from "&/assets/svg/rent.svg";
import { AiOutlineHeart } from "react-icons/ai";
import Notifications from "&/assets/svg/notifications.svg";
import Support from "&/assets/svg/supportProfile.svg";
import Exit from "&/assets/svg/exit.svg";

export const profileList = [
  {
    id: 1,
    label: "Profile",
    value: "Profile",
    icon: <User className="svgIcon" />,
    href: "/profile",
  },
  {
    id: 2,
    label: "My properties",
    value: "My properties",
    icon: <Home className="svgIcon" />,
    href: "/profile/properties",
  },
  {
    id: 3,
    label: "Appointment",
    value: "Appointment",
    icon: <Calendar className="svgIcon" />,
    href: "/profile",
  },
  {
    id: 4,
    label: "Visited",
    value: "Visited",
    icon: <Eye className="svgIcon" />,
    href: "/profile",
  },
  {
    id: 5,
    label: "Transactions",
    value: "Transactions",
    icon: <Rent className="svgIcon" />,
    href: "/profile",
  },
  {
    id: 6,
    label: "Liked properties",
    value: "Liked properties",
    icon: <AiOutlineHeart className="svgIcon" />,
    href: "/profile",
  },
  {
    id: 7,
    label: "notification",
    value: "notification",
    icon: <Notifications className="svgIcon" />,
    href: "/profile",
  },
  {
    id: 8,
    label: "Support",
    value: "Support",
    icon: <Support className="svgIcon" />,
    href: "/profile",
  },
  {
    id: 9,
    label: "Exit",
    value: "Exit",
    icon: <Exit className="svgIcon" />,
    href: "/profile",
  },
];

export const userField = [
  {
    id: 1,
    label: "Name",
    placeHolder: "Insert your Name ... ",
    type: "Text",
    name: "first_name",
  },
  {
    id: 2,
    label: "Last Name",
    placeHolder: "Insert your Last Name ... ",
    type: "Text",
    name: "last_name",
  },
  {
    id: 3,
    label: "Realstate name",
    placeHolder: "Insert your realstate name ... ",
    type: "Text",
    name: "real_state_name",
  },
];

export const supportSelect = [
  {
    id: 1,
    label: "support",
    value: "support",
  },
  {
    id: 2,
    label: "sale",
    value: "sale",
  },
];

export const supportTableHeads = [
  {
    id: 1,
    label: "#",
  },
  {
    id: 2,
    label: "Ticket Number",
  },
  {
    id: 3,
    label: "Section",
  },
  {
    id: 4,
    label: "Topic",
  },
  {
    id: 5,
    label: "Status",
  },
  {
    id: 6,
    label: "Last Update",
  },
];
