import Image from 'next/image'

export default async function GalleryPage() {
  const res = await fetch(
    'https://mmission007.org/wp-json/wp/v2/photogallerymm',
    { next: { revalidate: 3600 } } // cache for 1 hour
  )

  if (!res.ok) throw new Error('Failed to fetch gallery')
  const posts = await res.json()

  const photos = await Promise.all(
    posts.map(async (item) => {
      const attachmentEndpoint = item._links?.['wp:attachment']?.[0]?.href ?? null

      let imageUrl = null
      if (attachmentEndpoint) {
        const mediaRes = await fetch(attachmentEndpoint, { next: { revalidate: 3600 } })
        if (mediaRes.ok) {
          const media = await mediaRes.json()
          imageUrl = media?.[0]?.source_url ?? null
        }
      }

      return {
        imagemm: imageUrl,
        title: item.acf?.title,
        description: item.acf?.description,
        year_select: item.acf?.year_select
      }
    })
  )

  return (
    <main className="p-6">
      <h2 className="page-title-hero">Photo Gallery</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((p, i) => (
          <article key={i} className="rounded-lg overflow-hidden shadow">
            {p.imagemm && (
              <Image
                src={p.imagemm}
                alt={p.title || 'photo'}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm opacity-80">{p.description}</p>
              <p className="text-xs mt-2 text-gray-400">{p.year_select}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
