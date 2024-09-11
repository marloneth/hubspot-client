import { iNotification, Store } from "react-notifications-component";

const notificationBaseConfig: iNotification = {
  title: "",
  message: "",
  type: "info",
  insert: "top",
  container: "top-right",
  animationIn: ["animate__animated", "animate__fadeIn"],
  animationOut: ["animate__animated", "animate__fadeOut"],
  dismiss: {
    duration: 3000,
    onScreen: true,
  },
};
export function errorMessage(title = "", message = "Ocurrió un error") {
  Store.addNotification({
    ...notificationBaseConfig,
    title,
    message,
    type: "danger",
  });
}

export function successMessage(title = "", message = "") {
  Store.addNotification({
    ...notificationBaseConfig,
    title,
    message,
    type: "success",
  });
}
