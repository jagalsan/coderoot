import { SITE_NAME } from '~/consts'
import { BasicMetas } from '~/types/metas'

export function getBasicMetas({
    title,
    description,
    image = ``,
    robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    type = 'website',
}: BasicMetas) {
    return [
        { title },
        {
            property: 'og:title',
            content: title,
        },
        {
            name: 'description',
            content: description,
        },
        {
            property: 'og:description',
            content: description,
        },
        {
            name: 'robots',
            content: robots,
        },
        {
            property: 'og:type',
            content: type,
        },
        {
            property: 'og:image',
            content: image,
        },
        {
            property: 'og:image:width',
            content: '1366',
        },
        {
            property: 'og:image:height',
            content: '768',
        },
        {
            property: 'og:image:type',
            content: 'image/webp',
        },
        {
            property: 'og:site_name',
            content: SITE_NAME,
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: title,
        },
    ]
}

export function getBusinessJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,

        logo: ``,
        sameAs: [],
        contactPoint: [
            {
                '@type': 'ContactPoint',
                contactType: 'customer service',

                availableLanguage: 'es',
            },
        ],
    }
}
