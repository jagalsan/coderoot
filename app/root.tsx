import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

//@ts-expect-error idk
import stylesheet from "~/tailwind.css?url";
import { useEffect } from "react";
import { ThemeProvider } from "~/contexts/ThemeContext";
import { LanguageProvider } from "~/contexts/LanguageContext";

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    url: request.url,
  });
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  const { url } = useLoaderData<typeof loader>();

  useEffect(() => {
    // Solo cargar scripts de tracking en producción
    if ((import.meta as any).env?.DEV) return;

    // Google Tag Manager
    (function (w: any, d: Document, s: string, l: string, i: string) {
      w[l] = w[l] || [];
      w[l].push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      });
      const f = d.getElementsByTagName(s)[0],
        j = d.createElement(s) as HTMLScriptElement,
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode?.insertBefore(j, f);
    })(window, document, "script", "dataLayer", "GTM-WP44KWBC");

    // Google Analytics 4
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-X58CRXTLJ7';
    document.head.appendChild(gaScript);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'G-X58CRXTLJ7');

    // Meta Pixel
    (function(f: any, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: any = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    (window as any).fbq('init', '909301398094959');
    (window as any).fbq('track', 'PageView');
  }, []);

  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content="es" />
        
        <Meta />
        <Links />
      </head>
      <body className="bg-[#030303] dark:bg-[#030303] light:bg-white text-gray-300 dark:text-gray-300 light:text-gray-700 transition-colors duration-300" suppressHydrationWarning>
        <noscript>
          <iframe
            title="#"
            src="https://www.googletagmanager.com/ns.html?id=GTM-WP44KWBC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <ThemeProvider>
          <LanguageProvider>
            <main>
              <Outlet />
              <ScrollRestoration />
              <Scripts />
            </main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
