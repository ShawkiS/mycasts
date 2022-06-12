import { toast } from "react-toastify";

export const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(' ')
}

export const copyLink = (value: string, message: string) => {
    navigator.clipboard.writeText(value);
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });  
}