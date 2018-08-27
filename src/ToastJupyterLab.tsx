import * as React from "react";
import {
  ToastContainer,
  ToastContainerProps,
  toast,
  ToastContent,
  ToastOptions,
  Slide,
  UpdateOptions,
  ToastType
} from "react-toastify";

export class LabToastContainer extends React.Component<ToastContainerProps> {
  render() {
    return (
      <ToastContainer
        draggable={false}
        hideProgressBar={true}
        newestOnTop
        position="bottom-right"
        className="jp-toastContainer"
        // autoClose={false}
        transition={Slide}
      />
    );
  }
}

export namespace INotification {
  export const error = (message: React.ReactNode): number =>
    toast(message, {
      type: "error",
      className: "jp-toastContainer-error",
      autoClose: false
    });

  export const warning = (message: React.ReactNode): number =>
    toast(message, {
      type: "warning",
      className: "jp-toastContainer-warning",
      autoClose: false
    });

  export const info = (message: React.ReactNode): number =>
    toast(message, {
      type: "info",
      className: "jp-toastContainer-info"
    });

  export const success = (message: React.ReactNode): number =>
    toast(message, {
      type: "success",
      className: "jp-toastContainer-success"
    });

  export const inProgress = (message: React.ReactNode): number =>
    toast(message, {
      type: "default",
      className: "jp-toastContainer-inprogress",
      autoClose: false
    });

  export interface IUpdate {
    toastId: number,
    message: React.ReactNode,
    type?: ToastType,
    autoClose?: number
  }

  export const update = function(args: IUpdate) {
    let options: UpdateOptions = { render: args.message };
    if (args.type !== undefined) options.type = args.type;
    if (args.autoClose !== undefined) options.autoClose = args.autoClose;

    toast.update(args.toastId, options);
  };

  export const notify = (
    content: ToastContent,
    options?: ToastOptions
  ): number => toast(content, options);
}
