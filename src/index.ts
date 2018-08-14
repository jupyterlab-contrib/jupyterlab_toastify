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
    console.log('JupyterLab extension jupyterlab_toastify is activated!');
  }
};

export default extension;
