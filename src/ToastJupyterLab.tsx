import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faBell,
  faCheck,
  faExclamationTriangle,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import { closeIcon } from "@jupyterlab/ui-components";
import {
  ToastContent,
  ToastOptions,
  UpdateOptions,
  TypeOptions,
  ToastContainerProps,
  ClearWaitingQueueParams,
  ToastTransitionProps
} from "react-toastify";

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
    /**
     * Autoclosing behavior - undefined (not closing automatically)
     * or number (time in milliseconds before closing a toast)
     */
    autoClose?: number;
  }

  /**
   * Helper function to construct the notification content
   *
   * @param message Message to print in the notification
   * @param closeHandler Function closing the notification
   * @param buttons Toast buttons
   */
  function createContent(
    message: React.ReactNode,
    closeHandler: () => void,
    buttons?: IButton[],
    icon?: JSX.Element
  ): React.ReactNode {
    const hasButtons = buttons && buttons.length > 0;
    return (
      <>
        {icon ? icon : null}
        {message}
        {hasButtons && (
          <div className="jp-toast-buttonBar">
            <div className="jp-toast-spacer" />
            {buttons.map((button, idx) => {
              return (
                <ToastButton
                  key={"button-" + idx}
                  button={button}
                  closeToast={closeHandler}
                />
              );
            })}
          </div>
        )}
      </>
    );
  }

  async function createToast(
    message: React.ReactNode,
    buttons?: IButton[],
    options?: ToastOptions,
    icon?: JSX.Element
  ): Promise<React.ReactText> {
    let _resolve: (value: React.ReactText) => void;
    const toast = await Private.toast();
    const promise = new Promise<React.ReactText>(resolve => {
      _resolve = resolve;
    });
    const theOptions = { ...options };
    const toastId: React.ReactText = toast(
      ({ closeToast }: { closeToast: () => void }) =>
        createContent(
          message,
          closeToast,
          buttons,
          icon || Private.type2Icon.get(theOptions.type)
        ),
      {
        ...options,
        onOpen: () => _resolve(toastId)
      }
    );

    return promise;
  }

  /**
   * Helper function to show an error notification. Those
   * notifications need an user action to close.
   *
   * @param message Message to be printed in the notification
   * @param options Options for the error notification
   * @returns ToastId
   */
  export const error = async (
    message: React.ReactNode,
    options?: IOptions
  ): Promise<React.ReactText> => {
    return createToast(message, options && options.buttons, {
      type: "error",
      className: "jp-toast-error",
      autoClose: (options && options.autoClose) || false
    });
  };
  /**
   * Helper function to show a warning notification. Those
   * notifications need an user action to close.
   *
   * @param message Message to be printed in the notification
   * @param options Options for the warning notification
   * @returns ToastId
   */
  export const warning = async (
    message: React.ReactNode,
    options?: IOptions
  ): Promise<React.ReactText> => {
    return createToast(message, options && options.buttons, {
      type: "warning",
      className: "jp-toast-warning",
      autoClose: (options && options.autoClose) || false
    });
  };

  /**
   * Helper function to show an informative notification. Those
   * notifications close automatically.
   *
   * @param message Message to be printed in the notification
   * @param options Options for the error notification
   * @returns ToastId
   */
  export const info = async (
    message: React.ReactNode,
    options?: IOptions
  ): Promise<React.ReactText> => {
    const theOptions = { ...options };
    const buttons = theOptions.buttons;
    const autoClose =
      theOptions.autoClose ||
      (buttons && buttons.length > 0 ? false : undefined);
    return createToast(message, buttons, {
      type: "info",
      className: "jp-toast-info",
      autoClose: autoClose
    });
  };

  /**
   * Helper function to show a success notification. Those
   * notifications close automatically.
   *
   * @param message Message to be printed in the notification
   * @param options Options for the error notification
   * @returns ToastId
   */
  export const success = async (
    message: React.ReactNode,
    options?: IOptions
  ): Promise<React.ReactText> => {
    const theOptions = { ...options };
    const buttons = theOptions.buttons;
    const autoClose =
      theOptions.autoClose ||
      (buttons && buttons.length > 0 ? false : undefined);
    return createToast(message, buttons, {
      type: "success",
      className: "jp-toast-success",
      autoClose: autoClose
    });
  };

  /**
   * Helper function to show a in progress notification. Those
   * notifications do not close automatically.
   *
   * @param message Message to be printed in the notification
   * @param options Options for the error notification
   * @returns ToastId
   */
  export const inProgress = async (
    message: React.ReactNode,
    options?: IOptions
  ): Promise<React.ReactText> => {
    return createToast(
      message,
      options && options.buttons,
      {
        type: "default",
        className: "jp-toast-inprogress",
        autoClose: (options && options.autoClose) || false
      },
      <FontAwesomeIcon
        icon={faSpinner}
        pull="left"
        spin
        style={{ color: "var(--jp-inverse-layout-color3)" }}
      />
    );
  };

  /** Options needed to update an existing toast */
  export interface IUpdate extends IOptions {
    /** Id of the toast to be updated */
    toastId: React.ReactText;
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
  export const update = async (args: IUpdate): Promise<void> => {
    const toast = await Private.toast();
    const buttons = args.buttons;
    let options: ToastOptions = {};
    if (args.type) {
      options.type = args.type;
    }
    const autoClose =
      args.autoClose || (buttons && buttons.length > 0 ? false : undefined);
    if (autoClose) {
      options.autoClose = autoClose;
    }

    if (toast.isActive(args.toastId)) {
      // Update existing toast
      const closeToast = () => {
        toast.dismiss(args.toastId);
      };
      toast.update(args.toastId, {
        ...options,
        render: createContent(
          args.message,
          closeToast,
          args.buttons,
          Private.type2Icon.get(options.type)
        )
      });
    } else {
      // Needs to recreate a closed toast

      // If not type specified, assumes it is `in progress`
      const newOptions: ToastOptions = {
        autoClose: false,
        className: "jp-toast-inprogress",
        toastId: args.toastId,
        type: "default",
        ...options
      };

      await createToast(args.message, args.buttons, newOptions);
    }
  };

  /**
   * Dismiss one toast (specified by its id) or all if no id provided
   *
   * @param toastId Toast id
   * @returns False or void
   */
  export const dismiss = async (
    toastId?: React.ReactText
  ): Promise<false | void> => {
    const toast = await Private.toast();
    return toast.dismiss(toastId);
  };

  /**
   * Proxy to `toast` function from `react-toastify` module
   *
   * The Promise is due to the asynchronous import of the dependency
   *
   * @param content Toast content
   * @param options Toast creation option
   * @returns ToastId
   */
  export const notify = async (
    content: ToastContent,
    options?: ToastOptions
  ): Promise<React.ReactText> => {
    const toast = await Private.toast();
    return toast(content, options);
  };
}

interface IToast {
  (content: ToastContent, options?: ToastOptions | undefined): React.ReactText;
  success(
    content: ToastContent,
    options?: ToastOptions | undefined
  ): React.ReactText;
  info(
    content: ToastContent,
    options?: ToastOptions | undefined
  ): React.ReactText;
  error(
    content: ToastContent,
    options?: ToastOptions | undefined
  ): React.ReactText;
  warning(
    content: ToastContent,
    options?: ToastOptions | undefined
  ): React.ReactText;
  dark(
    content: ToastContent,
    options?: ToastOptions | undefined
  ): React.ReactText;
  /**
   * Maybe I should remove warning in favor of warn, I don't know
   */
  warn: (
    content: ToastContent,
    options?: ToastOptions | undefined
  ) => React.ReactText;
  /**
   * Remove toast programmatically
   */
  dismiss(id?: React.ReactText): false | void;
  /**
   * Clear waiting queue when limit is used
   */
  clearWaitingQueue(params?: ClearWaitingQueueParams): false | void;
  /**
   * return true if one container is displaying the toast
   */
  isActive(id: React.ReactText): boolean;
  update(toastId: React.ReactText, options?: UpdateOptions): void;
  /**
   * Used for controlled progress bar.
   */
  done(id: React.ReactText): void;
  /**
   * Track changes. The callback get the number of toast displayed
   *
   */
  onChange(
    callback: (toast: number, containerId?: React.ReactText) => void
  ): () => void;
  /**
   * Configure the ToastContainer when lazy mounted
   */
  configure(config?: ToastContainerProps): void;
  POSITION: {
    TOP_LEFT: string;
    TOP_RIGHT: string;
    TOP_CENTER: string;
    BOTTOM_LEFT: string;
    BOTTOM_RIGHT: string;
    BOTTOM_CENTER: string;
  };
  TYPE: {
    INFO: string;
    SUCCESS: string;
    WARNING: string;
    ERROR: string;
    DEFAULT: string;
    DARK: string;
  };
}

namespace Private {
  export const type2Icon = new Map<TypeOptions, JSX.Element>([
    ["default", null],
    [
      "error",
      <FontAwesomeIcon
        icon={faExclamationCircle}
        pull="left"
        style={{ color: "var(--jp-error-color1)" }}
      />
    ],
    [
      "warning",
      <FontAwesomeIcon
        icon={faExclamationTriangle}
        pull="left"
        style={{ color: "var(--jp-warn-color1)" }}
      />
    ],
    [
      "info",
      <FontAwesomeIcon
        icon={faBell}
        pull="left"
        style={{ color: "var(--jp-info-color1)" }}
      />
    ],
    [
      "success",
      <FontAwesomeIcon
        icon={faCheck}
        pull="left"
        style={{ color: "var(--jp-success-color1)" }}
      />
    ]
  ]);

  let toastify: {
    toast: IToast;
    Slide: (
      {
        children,
        position,
        preventExitTransition,
        done,
        ...props
      }: ToastTransitionProps
    ) => JSX.Element;
  } = null;

  const CloseButton: React.FunctionComponent<{ closeToast: () => void }> = ({
    closeToast
  }) => (
    <i onClick={closeToast}>
      <closeIcon.react
        className="jp-icon-hover"
        elementPosition="center"
        height="16px"
        width="16px"
      />
    </i>
  );

  export async function toast(): Promise<IToast> {
    if (toastify === null) {
      toastify = await import("react-toastify");

      toastify.toast.configure({
        draggable: false,
        closeOnClick: false,
        hideProgressBar: true,
        newestOnTop: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        position: "bottom-right",
        className: "jp-toastContainer",
        transition: toastify.Slide,
        closeButton: CloseButton
      });
    }

    return toastify.toast;
  }
}
