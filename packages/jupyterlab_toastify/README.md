# jupyterlab_toastify

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/fcollonval/jupyterlab_toastify/master?urlpath=lab)
[![GitHub CI](https://github.com/fcollonval/jupyterlab_toastify/workflows/CI/badge.svg)](https://github.com/fcollonval/jupyterlab_toastify/actions?query=workflow%3ACI)
[![npm](https://img.shields.io/npm/v/jupyterlab_toastify.svg?style=flat-square)](https://www.npmjs.com/package/jupyterlab_toastify)

Integrate [`react-toastify`](https://github.com/fkhadra/react-toastify) nicely in JupyterLab.

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
let id = await INotification.inProgress("Task in progress!");
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
// See https://github.com/fkhadra/react-toastify
INotification.notify("Default");
```

To close a notification, click on the close button.

## Prerequisites

- [react](https://reactjs.org/) ^16.0 || ^17.0
- [react-toastify](https://github.com/fkhadra/react-toastify) ^6.0

## Installation

This is a pure NPM package since v4. You don't need to install a JupyterLab extension.

The toast container will be added to the DOM automatically by `react-toastify`.

> All functions are asynchronous as `react-toastify` is lazy loaded if required.

## Changelog

### v4.1.1

- Bug fixes:
  - Remove dependency on `@jupyterlab/ui-components`

### v4.1.0

- Features
  - Use SVG icons

### v4.0.0

- Features
  - `react-toastify` v5 introduces the ability to add the toast container automatically.
    This extension uses that ability to remove the need of having a dedicated JupyterLab extension
    to be installed by users.
  - Lazy load `react-toastify` => all functions are asynchronous
  - Bump to `react-toastify` v6

### v3.0.0

Port to JupyterLab v2

### v2.3.1

- BUG `INotification.warning` does not accept options.
- Respect latest extension cookiecutter parameters

### v2.3.0

- Port to JupyterLab v1

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
