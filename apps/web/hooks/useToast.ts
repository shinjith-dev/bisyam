import { useContext } from "react";
import { ToastContext, ToastProps } from "@/contexts/ToastContext";

export const useToast = (): ToastProps => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useSnackBar must be used within an SnackBarProvider");
  }

  return context;
};
