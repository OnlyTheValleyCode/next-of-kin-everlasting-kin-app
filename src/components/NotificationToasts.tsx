import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function NotificationToasts() {
  return <ToastContainer position="top-right" autoClose={4000} />;
}