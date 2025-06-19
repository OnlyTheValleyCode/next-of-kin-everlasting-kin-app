import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function NotificationToasts() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      toastStyle={{
        backgroundColor: 'var(--ek-bg-main)',
        color: 'var(--ek-text-main)',
        border: '1px solid rgba(184, 186, 207, 0.2)',
      }}
    />
  );
}