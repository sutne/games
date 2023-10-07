import React from "react";
import {
  toast as toastify,
  ToastContainer as ToastifyContainer,
} from "react-toastify";

import { useTheme } from "components/providers";

import "react-toastify/dist/ReactToastify.css";

export function ToastContainer() {
  const { theme } = useTheme();
  return (
    <ToastifyContainer
      autoClose={7500}
      closeOnClick={true}
      draggable={false}
      toastStyle={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[5],
        whiteSpace: "pre-wrap",
      }}
    />
  );
}

export function toast(message: string) {
  return toastify(message);
}
toast.success = (message: string) => toastify.success(message);
toast.info = (message: string) => toastify.info(message);
toast.warn = (message: string) => toastify.warn(message);
toast.error = (message: string) => toastify.error(message);
