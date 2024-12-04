// _app.tsx

import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Register the service worker to make the app a PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;