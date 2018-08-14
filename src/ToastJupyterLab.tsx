import * as React from 'react';
import { ToastContainer, ToastContainerProps, toast, ToastContent, ToastOptions, Slide } from 'react-toastify';

export class LabToastContainer extends React.Component<ToastContainerProps> {
  render() {
    return (
      <ToastContainer
        draggable={false}
        hideProgressBar={true}
        newestOnTop
        position='bottom-right'
        className='jp-toastContainer'
        // autoClose={false}
        transition={Slide}
      />);
  }
}

export namespace INotification {
  export const error = (message: string): number => toast(
    message,
    {
      type: 'error',
      className: 'jp-toastContainer-error'
    }
  );
  
  export const warning = (message: string): number => toast(
    message,
    {
      type: 'warning',
      className: 'jp-toastContainer-warning'
    }
  );
  
  export const info = (message: string): number => toast(
    message,
    {
      type: 'info',
      className: 'jp-toastContainer-info'
    }
  );
  
  export const success = (message: string): number => toast(
    message,
    {
      type: 'success',
      className: 'jp-toastContainer-success'
    }
  );

  export const notify = (content: ToastContent, options?: ToastOptions): number => toast(
    content,
    options
  );
}