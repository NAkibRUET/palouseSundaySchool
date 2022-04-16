/* eslint-disable react-hooks/exhaustive-deps */
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { userService } from '../services';
const clientSideEmotionCache = createEmotionCache();
function MyApp({ Component, pageProps }: AppProps) {
  const emotionCache = clientSideEmotionCache;
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }
  }, []);

  function authCheck(url: any) {
    console.log(url);
    // redirect to login page if accessing a private page and not logged in 
    const publicPaths = ['/login', '/', '/registration'];
    const path = url.split('?')[0];
    console.log(path);
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      });
    } else if (path == '/login' && userService.userValue) {
      console.log("Path is ", path);
      router.push({
        pathname: '/admin',
      });
    }
    else {
      setAuthorized(true);
    }
  }

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp
