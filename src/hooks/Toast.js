import { toast } from "react-hot-toast";

export const Toast = (type, message) => {
  toast.remove();
  toast[type](message);
};
