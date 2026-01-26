export interface BreadCrumbJsonLdItem {
    position: number
    name: string
    item: string
}

export interface FAQJsonLdItem {
    question: string
    answer: string
}

export interface BasicMetas {
    title: string
    description: string
    image?: string
    robots?: string
    type?: 'website' | 'article'
}
