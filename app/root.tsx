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
        
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '909301398094959');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=909301398094959&ev=PageView&noscript=1"
          />
        </noscript>
        
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
