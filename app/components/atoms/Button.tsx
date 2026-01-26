import { Fragment, ReactNode } from 'react'
import cn from 'classnames'
import Spinner from '../molecules/Spinner'
import { Link } from '@remix-run/react'
import { RemixLinkProps } from '@remix-run/react/dist/components'

export default function Button({
    children,
    variant,
    to,
    asLink = false,
    isLoading = false,
    isDisabled = false,
    hasIcon = false,
    className,
    props,
}: {
    children: ReactNode | string
    variant: 'primary' | 'ghost' | 'accent' | 'secondary'
    to?: string
    asLink?: boolean
    isLoading?: boolean
    isDisabled?: boolean
    hasIcon?: boolean
    className?: string
    props?:
        | React.ForwardRefExoticComponent<
              RemixLinkProps & React.RefAttributes<HTMLAnchorElement>
          >
        | React.LinkHTMLAttributes<HTMLLinkElement>
}) {
    function getVariantClassname() {
        if (isDisabled) {
            return 'bg-zinc-800 text-gray-500 pointer-events-none'
        }

        switch (variant) {
            case 'primary':
                return 'bg-white text-black tracking-tighter'
            case 'ghost':
                return ''
            case 'secondary':
                return ''
            case 'accent':
                return ''
        }
    }

    return (
        <Fragment>
            {!asLink && (
                <button
                    className={cn(
                        getVariantClassname(),
                        className,
                        hasIcon && 'flex items-center gap-x-3',
                        'w-fit rounded-md px-5 py-3 font-semibold'
                    )}
                    {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
                >
                    {isLoading && <Spinner />}
                    {!isLoading && <Fragment>{children}</Fragment>}
                </button>
            )}
            {asLink && (
                <Link
                    to={to ?? ''}
                    className={cn(
                        getVariantClassname(),
                        className,
                        hasIcon && 'flex items-center gap-x-3',
                        'w-fit rounded-md px-5 py-3'
                    )}
                    {...(props as any)}
                >
                    {isLoading && <Spinner />}
                    {!isLoading && <Fragment>{children}</Fragment>}
                </Link>
            )}
        </Fragment>
    )
}
