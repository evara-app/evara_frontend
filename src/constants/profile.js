//? import icons
import User from "&/assets/svg/user.svg";
import Home from "&/assets/svg/home.svg";
import Calendar from "&/assets/svg/CalendarProfile.svg";
import Eye from "&/assets/svg/eye.svg";
import Rent from "&/assets/svg/rent.svg";
import Heart from "&/assets/svg/heartProfile.svg";
import Notifications from "&/assets/svg/notifications.svg";
import Support from "&/assets/svg/supportProfile.svg";
import Exit from "&/assets/svg/exit.svg";

export const profileList = [
  {
    id: 1,
    label: "Profile",
    value: "Profile",
    icon: <User className="svgIcon" />,
  },
  {
    id: 2,
    label: "My properties",
    value: "My properties",
    icon: <Home className="svgIcon" />,
  },
  {
    id: 3,
    label: "Appointment",
    value: "Appointment",
    icon: <Calendar className="svgIcon" />,
  },
  {
    id: 4,
    label: "Visited",
    value: "Visited",
    icon: <Eye className="svgIcon" />,
  },
  {
    id: 5,
    label: "Transactions",
    value: "Transactions",
    icon: <Rent className="svgIcon" />,
  },
  {
    id: 6,
    label: "Liked properties",
    value: "Liked properties",
    icon: <Heart className="svgIcon" />,
  },
  {
    id: 7,
    label: "notification",
    value: "notification",
    icon: <Notifications className="svgIcon" />,
  },
  {
    id: 8,
    label: "Support",
    value: "Support",
    icon: <Support className="svgIcon" />,
  },
  {
    id: 9,
    label: "Exit",
    value: "Exit",
    icon: <Exit className="svgIcon" />,
  },
];

export const userField = [
  {
    id: 1,
    label: "Name",
    placeHolder: "Insert your Name ... ",
    type: "Text",
    name: "name",
  },
  {
    id: 1,
    label: "Last Name",
    placeHolder: "Insert your Last Name ... ",
    type: "Text",
    name: "lastName",
  },
  {
    id: 1,
    label: "Phone number",
    placeHolder: "Insert your Phone number ... ",
    type: "Number",
    name: "phoneNumber",
  },
];
