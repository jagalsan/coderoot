import { ReactNode } from 'react'
import cn from 'classnames'

export default function Container({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <div className={cn('px-lg-0 mx-auto max-w-[1200px] px-4', className)}>
            {children}
        </div>
    )
}
