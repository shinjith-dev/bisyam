/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Slide, Snackbar } from "@mui/material";
import {
  ReactElement,
  ReactNode,
  createContext,
  useRef,
  useState,
} from "react";

function SlideTransition({
  children,
  ...props
}: {
  children: ReactElement<any, any>;
}) {
  return (
    <Slide {...props} direction="left">
      {children}
    </Slide>
  );
}

type DataType = {
  message: string | undefined;
  type?: "success" | "error" | undefined;
};

export type ToastProps = {
  createToast: ({ message, type }: DataType) => void;
};

interface ProviderProps {
  children: ReactNode;
}

export const ToastContext = createContext({} as ToastProps);

export function ToastProvider({ children }: ProviderProps) {
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<DataType | undefined>(undefined);
  const queueRef = useRef<DataType[]>([]);

  const handleClose = () => {
    setOpen(false);
  };

  function processQueue() {
    if (queueRef.current.length > 0) {
      setOpen(true);
      setSnackbar(queueRef.current.shift());
    }
  }

  const createToast = (toastData: DataType) => {
    queueRef.current.push(toastData);

    if (open) setOpen(false);
    else processQueue();
  };

  function handleExited() {
    processQueue();
  }

  return (
    <ToastContext.Provider value={{ createToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          variant="standard"
          onClose={handleClose}
          severity={snackbar?.type}
          sx={{ width: "100%" }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}
