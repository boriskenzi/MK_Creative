/** Images imported from the public Picdrop galleries into src/assets/galleries/{id}/. */
const modules = import.meta.glob(
  "../assets/galleries/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" },
)

function fromAssets(id) {
  return Object.entries(modules)
    .filter(([path]) => path.includes(`/galleries/${id}/`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, src]) => src)
}

export function galleryImages(item) {
  const srcs = fromAssets(item.id)
  const list = srcs.length ? srcs : item.image ? [item.image] : []
  return list.map((src, index) => ({
    src,
    alt: `${item.title}, visuel ${index + 1}`,
  }))
}

export function galleryCover(item) {
  return galleryImages(item)[0]?.src || item.image
}

export function galleryCountLabel(item, count) {
  const photo = item.fit !== "contain"
  if (photo) return count <= 1 ? `${count} photo` : `${count} photos`
  return count <= 1 ? `${count} visuel` : `${count} visuels`
}
