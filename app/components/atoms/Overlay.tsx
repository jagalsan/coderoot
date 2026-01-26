import cn from 'classnames'
import { ReactNode } from 'react'

export default function Overlay({
    className = 'bg-black/50',
    children,
}: {
    className?: string
    children?: ReactNode | ReactNode[]
}) {
    return (
        <div className={cn('absolute h-full w-full', className)}>
            {children}
        </div>
    )
}
