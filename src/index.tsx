import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { LabToastContainer, INotification } from './ToastJupyterLab';

import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the jupyterlab_toastify extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_toastify',
  autoStart: true,
  activate: (app: JupyterLab) => {
    app.restored.then(() => {
      const node = document.createElement('div');
      document.body.appendChild(node);
      ReactDOM.render(<LabToastContainer />, node);
  
      /* For testing
      INotification.error('Error');
      setTimeout(INotification.info, 500, 'Info');
      setTimeout(INotification.warning, 1000, 'Warning');
      setTimeout(INotification.success, 1500, 'Success');
      setTimeout(INotification.notify, 2000, 'Default');
      */
    });    
  }
};

export { INotification };
export default extension;
