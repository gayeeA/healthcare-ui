import * as React from 'react'
import { cn } from '../../lib/utils'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}
interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}
interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

function Avatar({ className, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <img
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <div
      className={cn(
        "flex aspect-square h-full w-full items-center justify-center rounded-full bg-muted",
        className
      )}
      {...props}
    />
  )
}

Avatar.displayName = 'Avatar'
AvatarImage.displayName = 'AvatarImage'
AvatarFallback.displayName = 'AvatarFallback'

export { Avatar, AvatarImage, AvatarFallback }

