import SpinnerScreen from '../components/Spinner';
import Context from '../context/context';
import '../styles/globals.css';
import '../styles/prism.css';
import { Router } from 'next/router';
import { useState } from 'react';

export default function App({ Component, pageProps, }) {
  const [spinner, setspinner] = useState(false);
  Router.events.on('routeChangeStart', () => {
    setspinner(true);
  });

  Router.events.on('routeChangeComplete', () => {
    setspinner(false);
  });

  return <>
    <Context>
      {spinner && <SpinnerScreen />}
      <Component {...pageProps} />
    </Context>
  </>
}

