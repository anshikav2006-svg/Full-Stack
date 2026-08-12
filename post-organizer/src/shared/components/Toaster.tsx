import { Toaster as HotToaster } from 'react-hot-toast';

export function Toaster() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        className: 'font-body',
        style: {
          borderRadius: '1rem',
          background: 'rgba(255,255,255,0.95)',
          color: '#7c4a5c',
          border: '1px solid rgba(255,193,216,0.6)',
          boxShadow: '0 8px 30px rgba(183,110,121,0.15)',
        },
        success: { iconTheme: { primary: '#B76E79', secondary: '#fff' } },
      }}
    />
  );
}
