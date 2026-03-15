import Link from 'next/link'

export const ExternalLogoWrapper = ({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-20 w-auto max-w-48 items-center [&_img]:h-full [&_img]:w-auto [&_img]:object-contain [&_svg]:h-full [&_svg]:w-auto [&_svg]:object-contain"
    >
      {children}
    </Link>
  )
}

export default ExternalLogoWrapper
