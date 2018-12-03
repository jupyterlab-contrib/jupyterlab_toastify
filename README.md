# jupyterlab_toastify

Integrate 'react-toastify' nicely in JupyterLab.

![example](jupyterlab_notifications.gif)

## Usage

```javascript
import { INotification } from "jupyterlab_toastify";

// Error message notification - do not close automatically
INotification.error("Error");
// Warning message notification - do not close automatically
INotification.warning("Warning");
// Info message notification
INotification.info("Info");
// Success message notification
INotification.success("Success");

// Background task with progression animation
let id = INotification.inProgress("Task in progress!");
// -> Update text
INotification.update({
  toastId: id,
  message: "Updating task..."
});
// -> Update text, status and set closing delay (in ms)
INotification.update({
  toastId: id,
  message: "Task succeed",
  type: "success",
  autoClose: 3000
});

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
INotification.dismiss(id);

// Close all toasts
INotification.dismiss();

// Default call using `toast` function
// See https://github.com/fkhadra/react-toastify#usage
INotification.notify("Default");
```

To close a notification, click on the close button.

## Prerequisites

- [JupyterLab](https://github.com/jupyterlab/jupyterlab/) 0.35
- [react](https://reactjs.org/) 0.16
- [react-toastify](https://github.com/fkhadra/react-toastify) 4.4

## Installation

```bash
jupyter labextension install jupyterlab_toastify
```

## Changelog

### v2.2.0

- Different corrections
- `buttons` optional in `update`
- `dismiss` is visible through the `INotification` proxy

### v2.1.0

- Update to JupyterLab 0.35
- Update to react-toastify 4.4 => change enum for notifications type to `react-toastify\TypeOptions`

### v2.0.0

- API change: helper functions accept options in addition to the message
- API change: `update` requires object as input and not a lot of arguments
- New option `buttons` to add buttons with custom callback to the notification

### v1.x

- First version using `react-toastify`
- Five scenarii:
  - Error
  - Warning
  - Info
  - Success
  - InProgress

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
npm run build
jupyter labextension install .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```
