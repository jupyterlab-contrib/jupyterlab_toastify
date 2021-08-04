# jupyterlab_toastify

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/jupyterlab-contrib/jupyterlab_toastify/master?urlpath=lab)
[![GitHub CI](https://github.com/jupyterlab-contrib/jupyterlab_toastify/workflows/CI/badge.svg)](https://github.com/jupyterlab-contrib/jupyterlab_toastify/actions?query=workflow%3ACI)
[![npm](https://img.shields.io/npm/v/jupyterlab_toastify.svg?style=flat-square)](https://www.npmjs.com/package/jupyterlab_toastify)

Integrate [`react-toastify`](https://github.com/fkhadra/react-toastify) nicely in JupyterLab.

![example](https://raw.githubusercontent.com/jupyterlab-contrib/jupyterlab_toastify/master/jupyterlab_notifications.gif)

## Installation

This package is not a JupyterLab extension but a regular npm package. So to add it to your project:

```
jlpm add jupyterlab_toastify
```

## Usage

```javascript
import { INotification } from 'jupyterlab_toastify';

// Error message notification - do not close automatically
INotification.error('Error');
// Warning message notification - do not close automatically
INotification.warning('Warning');
// Info message notification
INotification.info('Info');
// Success message notification
INotification.success('Success');

// Background task with progression animation
let id = await INotification.inProgress('Task in progress!');
// -> Update text
INotification.update({
  toastId: id,
  message: 'Updating task...'
});
// -> Update text, status and set closing delay (in ms)
INotification.update({
  toastId: id,
  message: 'Task succeed',
  type: 'success',
  autoClose: 3000
});

// Notification with two buttons
INotification.error('Error with button', {
  buttons: [
    {
      label: 'Action1',
      callback: () => alert('Action1 was clicked')
    },
    {
      label: 'Action2',
      callback: () => alert('Action2 was clicked')
    }
  ]
});

// Close a toast specified by its id
INotification.dismiss(id);

// Close all toasts
INotification.dismiss();

// Default call using `toast` function
// See https://github.com/fkhadra/react-toastify
INotification.notify('Default');
```

To close a notification, click on the close button.

## Prerequisites

- [react](https://reactjs.org/) ^16.0 || ^17.0
- [react-toastify](https://github.com/fkhadra/react-toastify) ^7.0

## Installation

This is a pure NPM package since v4. You don't need to install a JupyterLab extension.

The toast container will be added to the DOM automatically by `react-toastify`.

> All functions are asynchronous as `react-toastify` is lazy loaded if required.

## Changelog

### v4.2.0

- Update to [`react-toastify` v7](https://github.com/fkhadra/react-toastify/releases/tag/v7.0.0)
- Security updates:
  - Bump ini from 1.3.5 to 1.3.8 (#14)
  - Bump ssri from 8.0.0 to 8.0.1 (#15)
  - Bump hosted-git-info from 2.8.8 to 2.8.9 (#16)
  - Bump lodash from 4.17.20 to 4.17.21 (#17)
  - Bump ws from 7.4.5 to 7.4.6 (#19)
  - Bump normalize-url from 4.5.0 to 4.5.1 (#20)
  - Bump tar from 6.1.0 to 6.1.5 (#21)

### v4.1.2

- New feature:
  - Support JupyterLab 3

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
