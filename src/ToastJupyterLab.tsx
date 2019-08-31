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

/**
 * React component that will contains all toast produced through INotification
 */
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

  /** Create a button with customized callback in a toast */
  const ToastButton = ({
    button,
    closeToast
  }: {
    button: IButton;
    closeToast: () => void;
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
    /** List of buttons with callback action to include in a toast */
    buttons?: Array<IButton>;
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
      return <div>{message}</div>;
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
    toast(
      ({ closeToast }: { closeToast: () => void }) =>
        createToast(message, closeToast, options),
      {
        type: "error",
        className: "jp-toast-error",
        autoClose: false
      }
    );

  /**
   * Helper function to show a warning notification. Those
   * notifications need an user action to close.
   *
   * @param message Message to be printed in the notification
   * @param options Options for the warning notification
   */
  export const warning = (
    message: React.ReactNode,
    options?: IOptions
  ): number =>
    toast(
      ({ closeToast }: { closeToast: () => void }) =>
        createToast(message, closeToast, options),
      {
        type: "warning",
        className: "jp-toast-warning",
        autoClose: false
      }
    );

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
    let autoClose = options && options.buttons.length > 0 ? false : undefined;
    return toast(
      ({ closeToast }: { closeToast: () => void }) =>
        createToast(message, closeToast, options),
      {
        type: "info",
        className: "jp-toast-info",
        autoClose: autoClose
      }
    );
  };

  /**
   * Helper function to show a success notification. Those
   * notifications close automatically.
   *
   * @param message Message to be printed in the notification
   * @param options Options for the error notification
   */
  export const success = (
    message: React.ReactNode,
    options?: IOptions
  ): number => {
    let autoClose = options && options.buttons.length > 0 ? false : undefined;
    return toast(
      ({ closeToast }: { closeToast: () => void }) =>
        createToast(message, closeToast, options),
      {
        type: "success",
        className: "jp-toast-success",
        autoClose: autoClose
      }
    );
  };

  /**
   * Helper function to show a in progress notification. Those
   * notifications do not close automatically.
   *
   * @param message Message to be printed in the notification
   * @param options Options for the error notification
   */
  export const inProgress = (
    message: React.ReactNode,
    options?: IOptions
  ): number =>
    toast(
      ({ closeToast }: { closeToast: () => void }) =>
        createToast(message, closeToast, options),
      {
        type: "default",
        className: "jp-toast-inprogress",
        autoClose: false
      }
    );

  /** Options needed to update an existing toast */
  export interface IUpdate extends IOptions {
    /** Id of the toast to be updated */
    toastId: number;
    /** New message to be displayed */
    message: React.ReactNode;
    /** New type of the toast */
    type?: TypeOptions;
    /**
     * Autoclosing behavior - undefined (not closing automatically)
     * or number (time in milliseconds before closing a toast)
     */
    autoClose?: number;
  }

  /**
   * Update an existing toast.
   *
   * If the toast is inactive (i.e. closed), a new one with the provided id
   * will be created with the new content.
   *
   * @param args Update options
   */
  export const update = function(args: IUpdate) {
    let autoClose =
      args.buttons && args.buttons.length > 0
        ? args.autoClose || false
        : args.autoClose;
    const closeToast = () => {
      toast.dismiss(args.toastId);
    };
    let options: UpdateOptions = {
      render: createToast(args.message, closeToast, { buttons: args.buttons })
    };
    if (args.type) options.type = args.type;
    if (autoClose) {
      options.autoClose = autoClose;
    }

    if (toast.isActive(args.toastId)) {
      // Update existing toast
      toast.update(args.toastId, options);
    } else {
      // Needs to recreate a closed toast
      options.toastId = args.toastId;
      if (!options.type) {
        // If not type specifed, assumes it is `in progress`
        options = {
          ...options,
          type: "default",
          className: "jp-toast-inprogress",
          autoClose: false
        };
      }
      toast(options.render, options);
    }
  };

  /**
   * Dismiss one toast (specified by its id) or all if no id provided
   *
   * @param toastId Toast id
   */
  export const dismiss = (toastId?: number): void => {
    toast.dismiss(toastId);
  };

  /**
   * Proxy to `toast` function from `react-toastify` module
   *
   * @param content Toast content
   * @param options Toast creation option
   */
  export const notify = (
    content: ToastContent,
    options?: ToastOptions
  ): number => toast(content, options);
}
