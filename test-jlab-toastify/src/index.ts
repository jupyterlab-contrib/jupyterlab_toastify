import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from "@jupyterlab/application";

import { INotification } from "jupyterlab_toastify";

/**
 * Initialization data for the test-jlab-toastify extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: "test-jlab-toastify",
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    app.restored.then(async () => {
      // Error message notification - do not close automatically
      INotification.error("Error");
      // Warning message notification - do not close automatically
      INotification.warning("Warning");
      // Info message notification
      INotification.info("Info");
      // Success message notification
      INotification.success("Success");

      // Background task with progression animation
      let id = await INotification.inProgress("Task in progress!");
      setTimeout(() => {
        // -> Update text
        INotification.update({
          toastId: id,
          message: "Updating task..."
        });
        setTimeout(() => {
          // -> Update text, status and set closing delay (in ms)
          INotification.update({
            toastId: id,
            message: "Task succeed",
            type: "success",
            autoClose: 3000
          });
        }, 3000);
      }, 3000);

      // Notification with two buttons
      INotification.error("Error with button", {
        buttons: [
          {
            label: "Action1",
            callback: () => alert("Action1 was clicked")
          },
          {
            label: "Action2",
            callback: () => alert("Action2 was clicked")
          }
        ]
      });

      // Close a toast specified by its id
      // INotification.dismiss(id);

      // Close all toasts
      // INotification.dismiss();

      // Default call using `toast` function
      // See https://github.com/fkhadra/react-toastify
      INotification.notify("Default");
    });
  }
};

export default extension;
