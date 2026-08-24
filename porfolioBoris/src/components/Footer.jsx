import { content } from "../data/content"
import SocialIcons from "./SocialIcons"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[var(--color-accent)] text-white">
      <div className="site-wrap py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[15px] font-light">
            Email:{" "}
            <a href={`mailto:${content.email}`} className="font-semibold">
              {content.email}
            </a>
          </p>
          <p className="text-[15px] font-light">
            Appeler-moi :{" "}
            <a href={content.phoneHref} className="font-semibold">
              {content.phone}
            </a>
          </p>
          <div className="[&_a]:border-white/30 [&_a]:text-white">
            <SocialIcons items={content.socials} className="" />
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-white/25 pt-6 text-sm font-light md:flex-row md:justify-between">
          <p>
            © {year} {content.brand}. Tous droits réservés.
          </p>
          <p>{content.person}</p>
        </div>
      </div>
    </footer>
  )
}
