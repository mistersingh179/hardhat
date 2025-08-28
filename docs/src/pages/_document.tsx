/* eslint-disable react/no-danger */
import { Html, Head, Main, NextScript } from "next/document";

const MeasurementID = process.env.NEXT_PUBLIC_MEASUREMENT_ID as string;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Hint supported color schemes to the browser so native UI (forms, scrollbars) adapts */}
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#181A1F" />
        <link
          rel="preload"
          href="/fonts/Chivo-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="true"
        />
        <link
          rel="preload"
          href="/fonts/Chivo-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="true"
        />
        <link
          rel="preload"
          href="/fonts/Chivo-Light.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="true"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${MeasurementID}');

            `,
          }}
        />
      </Head>
      <body>
        {/* Initialize theme as early as possible to avoid FOUC and set browser UI colors */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
            const lightColor = '#ffffff';
            const darkColor = '#181A1F';
            const mql = window.matchMedia('(prefers-color-scheme: dark)');
            const getTheme = () => {
              const raw = localStorage.getItem('theme');
              return raw === 'LIGHT' || raw === 'DARK' || raw === 'AUTO' ? raw : 'AUTO';
            };
            const apply = () => {
              const theme = getTheme();
              const isDark = theme === 'DARK' || (theme === 'AUTO' && mql.matches);
              const THEME_CLASSES = ['LIGHT','DARK','AUTO'];
              document.body.classList.remove(...THEME_CLASSES);
              document.body.classList.add(theme);
              // Ensure override theme-color meta exists only for forced themes
              const overrideSelector = 'meta[name="theme-color"][data-managed-by="theme"]';
              let overrideMeta = document.querySelector(overrideSelector);
              if (theme === 'AUTO') {
                if (overrideMeta) overrideMeta.remove();
              } else {
                if (!overrideMeta) {
                  overrideMeta = document.createElement('meta');
                  overrideMeta.setAttribute('name', 'theme-color');
                  overrideMeta.setAttribute('data-managed-by', 'theme');
                  document.head.appendChild(overrideMeta);
                }
                overrideMeta.setAttribute('content', isDark ? darkColor : lightColor);
              }
              // Keep native UI aligned via CSS color-scheme hint
              document.documentElement.style.colorScheme = theme === 'AUTO' ? (mql.matches ? 'dark' : 'light') : (isDark ? 'dark' : 'light');
            };
            try { apply(); } catch {}
          })();
          `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
