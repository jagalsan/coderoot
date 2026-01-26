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
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      });
      const f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", "GTM-WP44KWBC");
  }, []);

  return (
    <html lang="es" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content="es" />
        
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-X58CRXTLJ7"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-X58CRXTLJ7');
            `,
          }}
        />
        
        <Meta />
        <Links />
      </head>
      <body className="bg-[#030303] dark:bg-[#030303] light:bg-white text-gray-300 dark:text-gray-300 light:text-gray-700 transition-colors duration-300">
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
