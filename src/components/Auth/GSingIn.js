import { useEffect, useRef, useState } from 'react';
import { GOOGLE_CLIENT_ID } from '../../constants/auth';
import { auth } from '../../reducers/auth.js';

const GoogleButton = () => {
  const divRef = useRef(null);
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(auth({ data: { result, token } }));
    } catch (err) {
      console.log(err);
    }
  };
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [google, setGoogle] = useState(null);
  const [googleIsLoading, setGoogleIsLoading] = useState(true);

  useEffect(() => {
    if (scriptLoaded) return undefined;

    const initializeGoogle = () => {
      if (!window.google || scriptLoaded) return;

      setScriptLoaded(true);
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: googleSuccess,
      });
    };

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = initializeGoogle;
    script.async = true;
    script.id = 'google-client-script';
    document.querySelector('body')?.appendChild(script);

    return () => {
      window.google?.accounts.id.cancel();
      document.getElementById('google-client-script')?.remove();
    };
  }, [scriptLoaded, google]);

  useInterval(
    () => {
      if (typeof window !== 'undefined' && window.google) {
        setGoogle(window.google);
        setGoogleIsLoading(false);
      }
    },
    googleIsLoading ? 100 : null
  );

  return <div ref={divRef} />;
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default GoogleButton;
