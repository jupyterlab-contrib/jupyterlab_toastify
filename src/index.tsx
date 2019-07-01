import * as React from "react";
import * as ReactDOM from "react-dom";

import { LabToastContainer, INotification } from "./ToastJupyterLab";

import {
  JupyterFrontEndPlugin,
  JupyterFrontEnd
} from "@jupyterlab/application";

import "../style/index.css";

/**
 * Initialization data for the jupyterlab_toastify extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: "jupyterlab_toastify",
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    app.restored.then(() => {
      const node = document.createElement("div");
      document.body.appendChild(node);
      ReactDOM.render(<LabToastContainer />, node);

      // For testing
      //   let id = INotification.inProgress("Task in progress!");
      //   setTimeout(INotification.update, 2500, {
      //     toastId: id,
      //     message: "Updating task..."
      //   });
      //   setTimeout(INotification.update, 3500, {
      //     toastId: id,
      //     message: "Task succeed",
      //     type: "success",
      //     autoClose: 3000
      //   });
      //   INotification.error("Error");
      //   setTimeout(
      //     INotification.info,
      //     500,
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis blandit tellus, non pulvinar justo."
      //   );
      //   setTimeout(INotification.warning, 1000, "Warning");
      //   setTimeout(INotification.success, 1500, "Success");
      //   setTimeout(INotification.notify, 2000, "Default");

      //   INotification.error("Error with button", {
      //     buttons: [
      //       {
      //         label: "Action1",
      //         callback: () => alert("Action1 was clicked")
      //       },
      //       {
      //         label: "Action2",
      //         callback: () => alert("Action2 was clicked")
      //       }
      //     ]
      //   });

      //   let id2 = INotification.inProgress("Task2 in progress! But how long will it take to get it done?");
      //   setTimeout(INotification.update, 4500, {
      //     toastId: id2,
      //     message: "Task2 succeed",
      //     type: "success",
      //     buttons: [
      //       {
      //         label: "Action3",
      //         callback: () => alert("Action3 was clicked")
      //       }
      //     ]
      //   });
    });
  }
};

export { INotification };
export { toast } from "react-toastify";
export default extension;
