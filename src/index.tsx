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
      let id = INotification.inProgress('Task in progress!')
      setTimeout(INotification.update, 2500, id, 'Updating task...');
      setTimeout(INotification.update, 3500, id, 'Task succeed', 'success', 3000);
      INotification.error('Error');
      setTimeout(INotification.info, 500, 
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis blandit tellus, non pulvinar justo.");
      setTimeout(INotification.warning, 1000, 'Warning');
      setTimeout(INotification.success, 1500, 'Success');
      setTimeout(INotification.notify, 2000, 'Default');
      */
    });    
  }
};

export { INotification };
export { toast } from 'react-toastify';
export default extension;
