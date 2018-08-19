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
INotification.update(id, "Updating task...");
// -> Update text, status and set closing delay (in ms)
INotification.update(id, "Task succeed", "success", 3000);

// Default call using `toast` function
// This is the only helper function taking two arguments: content and options.
// See https://github.com/fkhadra/react-toastify#usage
INotification.notify("Default");
```

To close a notification, click on it.

## Prerequisites

- [JupyterLab](https://github.com/jupyterlab/jupyterlab/) 0.34
- [react](https://reactjs.org/) 0.16
- [react-toastify](https://github.com/fkhadra/react-toastify) 0.4

## Installation

```bash
jupyter labextension install jupyterlab_toastify
```

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
