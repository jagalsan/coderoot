import { SITE_STATIC_PATHS } from '~/consts'
import { getCacheControlHeader } from '~/utils/server'

export async function loader() {
    return new Response(renderXML(), {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'x-content-type-options': 'nosniff',
            'Cache-Control': getCacheControlHeader('ONE_WEEK'),
        },
    })
}

const renderXML = () => {
    const sourceXML = `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

     ${SITE_STATIC_PATHS.map(
         (path) => `<url>
       <loc>/${path}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
     </url>`
     )}
   </urlset>`

    return sourceXML
}
