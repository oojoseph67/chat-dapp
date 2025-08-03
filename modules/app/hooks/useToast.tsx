import React, { ReactNode } from "react";
import { ExternalToast, toast } from "sonner";
import { CustomToast } from "../component/toast/toast";

type ToastOptions = ExternalToast & {
  title?: string;
  duration?: number;
};

type PromiseFunc<T = unknown> = Promise<T> | (() => Promise<T>);

type PromiseOpts<ToastData = any> = ExternalToast & {
  loading: string | React.ReactNode;
  success:
    | string
    | React.ReactNode
    | ((data: ToastData) => React.ReactNode | string);
  error: string | React.ReactNode | ((error: any) => React.ReactNode | string);
};

export function useToast() {
  const defaultDuration = 5000;
  const loadingDuration = 30000;

  function success(message: ReactNode, opts?: ToastOptions) {
    const { title = "Success", duration = defaultDuration, ...data } = opts || {};

    return toast.custom(
      (t) => (
        <CustomToast
          title={title}
          description={message}
          status="success"
          close={() => toast.dismiss(t)}
        />
      ),
      { duration, ...data }
    );
  }

  function error(message: ReactNode, opts?: ToastOptions) {
    const { title = "Error", duration = defaultDuration, ...data } = opts || {};
    
    return toast.custom(
      (t) => (
        <CustomToast
          title={title}
          description={message}
          status="error"
          close={() => toast.dismiss(t)}
        />
      ),
      { duration, ...data }
    );
  }

  function warning(message: string, opts?: ToastOptions) {
    const { title = "Warning", duration = defaultDuration, ...data } = opts || {};
    
    return toast.custom(
      (t) => (
        <CustomToast
          title={title}
          description={message}
          status="warning"
          close={() => toast.dismiss(t)}
        />
      ),
      { duration, ...data }
    );
  }

  function info(message: string, opts?: ToastOptions) {
    const { title = "Info", duration = defaultDuration, ...data } = opts || {};
    
    return toast.custom(
      (t) => (
        <CustomToast
          title={title}
          description={message}
          status="info"
          close={() => toast.dismiss(t)}
        />
      ),
      { duration, ...data }
    );
  }

  function loading(message: ReactNode, opts?: ToastOptions) {
    const { title = "Loading...", duration = loadingDuration, ...data } = opts || {};
    
    return toast.custom(
      (t) => (
        <CustomToast
          title={title}
          description={message}
          status="loading"
          close={() => toast.dismiss(t)}
        />
      ),
      { duration, ...data }
    );
  }

  function dismiss(id?: string | number) {
    return toast.dismiss(id);
  }

  function dismissAll() {
    return toast.dismiss();
  }

  function promise<T>(promise: PromiseFunc<T>, opts: PromiseOpts<T>) {
    const p = promise instanceof Promise ? promise : promise();
    const id = loading(opts.loading, { duration: Infinity });
    
    p.then((data) => {
      const message =
        typeof opts.success === "function" ? opts.success(data) : opts.success;
      
      toast.custom(
        (t) => (
          <CustomToast
            title="Success"
            description={message}
            status="success"
            close={() => toast.dismiss(t)}
          />
        ),
        { id, duration: defaultDuration }
      );
    }).catch((error) => {
      const message =
        typeof opts.error === "function" ? opts.error(error) : opts.error;

      toast.custom(
        (t) => (
          <CustomToast
            title="Error"
            description={message}
            status="error"
            close={() => toast.dismiss(t)}
          />
        ),
        { id, duration: defaultDuration }
      );
    });
    
    return id;
  }

  // Transaction-specific toasts
  function transactionPending(message = "Transaction in progress...") {
    return loading(message, {
      title: "Transaction Pending",
      duration: Infinity,
    });
  }

  function transactionSuccess(message = "Transaction completed successfully!") {
    return success(message, {
      title: "Transaction Success",
      duration: 4000,
    });
  }

  function transactionError(error: any, customMessage?: string) {
    const message = customMessage || 
      (error?.message || "Transaction failed. Please try again.");
    
    return error(message, {
      title: "Transaction Failed",
      duration: 6000,
    });
  }

  return Object.assign(info, {
    success,
    error,
    warning,
    loading,
    dismiss,
    dismissAll,
    promise,
    transactionPending,
    transactionSuccess,
    transactionError,
  });
}
