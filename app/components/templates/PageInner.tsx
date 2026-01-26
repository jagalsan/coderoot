import { ReactNode } from 'react'
import cn from 'classnames'

export default function PageInner({
    children,
    className,
}: {
    children: ReactNode | ReactNode[]
    className?: string
}) {
    return (
        <div className={cn(className ?? 'grid grid-cols-1', 'gap-y-12 py-10')}>
            {children}
        </div>
    )
}
