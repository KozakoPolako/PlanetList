import type { ToastContainerOptions } from "vue3-toastify";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const toastOptions: ToastContainerOptions = {
  theme: "dark",
  position: "bottom-right",
  autoClose: 3000
};

export default Vue3Toastify;
