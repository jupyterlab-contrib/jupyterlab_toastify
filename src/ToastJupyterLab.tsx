import * as React from "react";
import {
  ToastContainer,
  ToastContainerProps,
  toast,
  ToastContent,
  ToastOptions,
  Slide,
  UpdateOptions,
  TypeOptions
} from "react-toastify";

export class LabToastContainer extends React.Component<ToastContainerProps> {
  render() {
    return (
      <ToastContainer
        draggable={false}
        closeOnClick={false}
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
  export interface IButton {
    /**
     * The label for the button.
     */
    label: string;

    /**
     * Callback function
     */
    callback: () => void;

    /**
     * The caption for the button.
     */
    caption?: string;

    /**
     * The extra class name for the button.
     */
    className?: string;
  }

  interface ToastButtonProps {
    /**
     * User specification for the button
     */
    button: IButton;

    /**
     * Function closing the notification
     */
    closeToast: () => void;
  }

  const ToastButton = ({
    button,
    closeToast
  }): React.ReactElement<ToastButtonProps> => {
    let fullClassName =
      button.className === undefined
        ? "jp-toast-button"
        : "jp-toast-button " + button.className;
    const clickHandler = () => {
      closeToast();
      button.callback();
    };
    return (
      <button className={fullClassName} onClick={clickHandler}>
        {button.label}
      </button>
    );
  };

  /**
   * Notification options
   */
  export interface IOptions {
    buttons: Array<IButton>;
  }

  /**
   * Helper function to construct the notification content
   *
   * @param message Message to print in the notification
   * @param closeHandler Function closing the notification
   * @param options Notification options
   */
  function createToast(
    message: React.ReactNode,
    closeHandler: () => void,
    options?: IOptions
  ): React.ReactNode {
    if (
      options !== undefined &&
      options.buttons !== undefined &&
      options.buttons.length > 0
    ) {
      return (
        <div>
          {message}
          <div className="jp-toast-buttonBar">
            <div className="jp-toast-spacer" />
            {options.buttons.map((button, idx) => {
              return (
                <ToastButton
                  key={"button-" + idx}
                  button={button}
                  closeToast={closeHandler}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return message;
    }
  }

  /**
   * Helper function to show an error notification. Those
   * notifications need an user action to close.
   *
   * @param message Message to be printed in the notification
   * @param options Options for the error notification
   */
  export const error = (message: React.ReactNode, options?: IOptions): number =>
    toast(({ closeToast }) => createToast(message, closeToast, options), {
      type: "error",
      className: "jp-toast-error",
      autoClose: false
    });

  /**
   * Helper function to show a warning notification. Those
   * notifications need an user action to close.
   *
   * @param message Message to be printed in the notification
   * @param options Options for the error notification
   */
  export const warning = (message: React.ReactNode): number =>
    toast(message, {
      type: "warning",
      className: "jp-toast-warning",
      autoClose: false
    });

  /**
   * Helper function to show an informative notification. Those
   * notifications close automatically.
   *
   * @param message Message to be printed in the notification
   * @param options Options for the error notification
   */
  export const info = (
    message: React.ReactNode,
    options?: IOptions
  ): number => {
    let autoClose =
      options !== undefined && options.buttons.length > 0 ? false : undefined;
    return toast(
      ({ closeToast }) => createToast(message, closeToast, options),
      {
        type: "info",
        className: "jp-toast-info",
        autoClose: autoClose
      }
    );
  };

  /**
   * Helper function to show a success notification. Those
   * notification close automatically.
   *
   * @param message Message to be printed in the notification
   * @param options Options for the error notification
   */
  export const success = (
    message: React.ReactNode,
    options?: IOptions
  ): number => {
    let autoClose =
      options !== undefined && options.buttons.length > 0 ? false : undefined;
    return toast(
      ({ closeToast }) => createToast(message, closeToast, options),
      {
        type: "success",
        className: "jp-toast-success",
        autoClose: autoClose
      }
    );
  };

  export const inProgress = (
    message: React.ReactNode,
    options?: IOptions
  ): number =>
    toast(({ closeToast }) => createToast(message, closeToast, options), {
      type: "default",
      className: "jp-toast-inprogress",
      autoClose: false,
      closeButton: false
    });

  export interface IUpdate extends IOptions {
    toastId: number;
    message: React.ReactNode;
    type?: TypeOptions;
    autoClose?: number;
  }

  export const update = function(args: IUpdate) {
    let autoClose =
      args.buttons !== undefined && args.buttons.length > 0
        ? args.autoClose || false
        : args.autoClose;
    const closeToast = () => {
      toast.dismiss(args.toastId);
    };
    let options: UpdateOptions = {
      render: createToast(args.message, closeToast, { buttons: args.buttons })
    };
    if (args.type !== undefined) options.type = args.type;
    if (autoClose !== undefined) {
      options.autoClose = autoClose;
      options.closeButton = null;
    }

    toast.update(args.toastId, options);
  };

  export const notify = (
    content: ToastContent,
    options?: ToastOptions
  ): number => toast(content, options);
}
