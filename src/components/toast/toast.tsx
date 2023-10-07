import React from "react";
import {
  toast as toastify,
  ToastContainer as ToastifyContainer,
  ToastOptions,
} from "react-toastify";

import { useTheme } from "components/providers";

import "react-toastify/dist/ReactToastify.css";
import "./style.css";

export function ToastContainer() {
  const { theme } = useTheme();
  return (
    <ToastifyContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      toastStyle={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[5],
        whiteSpace: "pre-wrap",
      }}
    />
  );
}

const options: ToastOptions = { closeOnClick: true, autoClose: 7000 };
export function toast(message: string) {
  return toastify(message, options);
}
toast.success = (message: string) => toastify.success(message, options);
toast.info = (message: string) => toastify.info(message, options);
toast.warn = (message: string) => toastify.warn(message, options);
toast.error = (message: string) => toastify.error(message, options);
