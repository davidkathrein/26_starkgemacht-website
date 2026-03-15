import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-olive-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-olive-700 text-white hover:bg-olive-600 dark:bg-olive-400 dark:text-olive-950 dark:hover:bg-olive-300",
        light:
          "bg-olive-50 text-olive-800 hover:bg-olive-100 dark:bg-olive-200 dark:hover:bg-olive-100",
        soft:
          "bg-olive-950/10 text-olive-950 hover:bg-olive-950/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
        ghost: 
          "text-olive-950 hover:bg-olive-950/10 dark:text-white dark:hover:bg-white/10",
        ghostLight:
          "text-white hover:bg-white/15 dark:hover:bg-white/10",
        link: 
          "text-olive-700 underline-offset-4 hover:underline dark:text-olive-400",
      },
      size: {
        default: "px-3 py-1",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-4 py-2",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
