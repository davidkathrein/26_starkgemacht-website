import Image from 'next/image'
import { XIcon } from '@/app/(frontend)/components/icons/social/x-icon'
import { SiFacebook, SiLinkedin, SiInstagram } from 'react-icons/si'
import { Mail, Globe2 } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@/payload.config'

const getIconByName = (name: string) => {
  switch (name.toLowerCase()) {
    case 'x':
      return XIcon
    case 'linkedin':
      return SiLinkedin
    case 'facebook':
      return SiFacebook
    case 'mail':
      return Mail
    case 'website':
      return Globe2
    case 'instagram':
      return SiInstagram
    default:
      return null
  }
}

export default async function TeamImageShortParagraph() {
  const payload = await getPayload({ config })

  const { docs: teamMembers } = await payload.find({
    collection: 'team',
    limit: 100,
    sort: 'order',
  })
  return (
    <div className="py-24 md:py-32 lg:py-40 dark:bg-olive-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="font-display text-3xl/9 font-medium tracking-[-0.03em] text-pretty text-olive-950 sm:text-[2.5rem]/10 dark:text-white">
            Unser Team
          </h2>
          <p className="text-base/7 text-olive-700 dark:text-olive-400 text-pretty mt-6">
            Wir sind eine dynamische Gruppe von Menschen, die mit Leidenschaft bei der Sache sind
            und unseren Kunden die besten Ergebnisse liefern.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"
        >
          {teamMembers.map((member) => {
            const imageUrl =
              typeof member.photo === 'object' && member.photo?.url
                ? member.photo.url
                : typeof member.photo === 'string'
                  ? member.photo
                  : ''

            const Icon = getIconByName

            return (
              <li key={member.id}>
                {imageUrl && (
                  <Image
                    alt={member.name || ''}
                    src={imageUrl}
                    width={1024}
                    height={683}
                    className="aspect-3/2 w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10"
                  />
                )}
                <h3 className="mt-6 text-lg/8 font-semibold text-olive-950 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-base/7 text-olive-700 dark:text-olive-300">{member.role}</p>
                {member.bio && (
                  <p className="mt-4 text-base/7 text-olive-600 dark:text-olive-400">
                    {member.bio}
                  </p>
                )}
                {member.links && member.links.length > 0 && (
                  <ul role="list" className="mt-6 flex gap-x-6">
                    {member.links.map((link: any, index: number) => {
                      const IconComponent = Icon(link.platform)
                      if (!IconComponent) return null

                      return (
                        <li key={index}>
                          <a
                            href={link.url}
                            className="text-olive-600 hover:text-olive-700 dark:text-olive-400 dark:hover:text-olive-300"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="sr-only">{link.platform}</span>
                            <IconComponent className="size-5" />
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
