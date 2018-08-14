# jupyterlab_toastify

Integrate 'react-toastify' nicely in JupyterLab.

![example](jupyterlab_notifications.gif)

## Usage

```javascript
import { INotification } from 'jupyterlab_toastify';

// Error message notification
INotification.error('Error');
// Warning message notification
INotification.warning('Warning');
// Info message notification
INotification.info('Info');
// Success message notification
INotification.success('Success');

// Default call using `toast` function
// This is the only helper function taking two arguments: content and options.
// See https://github.com/fkhadra/react-toastify#usage
INotification.notify('Default');
```

## Prerequisites

* [JupyterLab](https://github.com/jupyterlab/jupyterlab/)
* [react](https://reactjs.org/)
* [react-toastify](https://github.com/fkhadra/react-toastify)

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

