import { redirect } from '@remix-run/node'

export function redirectWithToast(
    pathname: string,
    message: string,
    type: 'success' | 'error',
    alreadyHasParams = false
) {
    return redirect(
        `${pathname}${alreadyHasParams ? '&' : '?'}tm=${encodeURIComponent(message)}&tt=${encodeURIComponent(type)}`
    )
}

export function getCacheControlHeader(
    duration: 'THREE_DAYS' | 'ONE_WEEK' | 'ONE_MONTH'
): string {
    let maxAge: number

    switch (duration) {
        case 'THREE_DAYS':
            maxAge = 60 * 60 * 24 * 3
            break
        case 'ONE_WEEK':
            maxAge = 60 * 60 * 24 * 7
            break
        case 'ONE_MONTH':
            maxAge = 60 * 60 * 24 * 30
            break
    }

    return `public, max-age=${maxAge}, s-maxage=${maxAge}`
}
