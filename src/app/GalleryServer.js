import Image from 'next/image'

// Server-side gallery fetch
export default async function GalleryServer() {
  const res = await fetch('https://mmission007.org/wp-json/wp/v2/photogallerymm', {
    next: { revalidate: 1000 }
  })
  const data = await res.json()

  const photos = await Promise.all(
    data.map(async (item) => {
      const attachmentRes = await fetch(
        item._links?.['wp:attachment']?.[0]?.href ?? ''
      )
      const attachmentData = await attachmentRes.json()
      const imageURL = attachmentData?.[0]?.guid?.rendered ?? null

      return {
        id: item.id,
        imagemm: imageURL,
        title: item.acf?.title,
        description: item.acf?.description,
        year_select: item.acf?.year_select
      }
    })
  )

  return (
    <div className="gallery-grid">
      {photos.map((p) => (
        <div key={p.id} className="gallery-item">
          {p.imagemm && (
            <Image
              src={p.imagemm}
              width={400}
              height={300}
              alt={p.title || 'photo'}
              className="gallery-img"
              priority={false}
            />
          )}
          {/* <div className="gallery-info">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p className="year">{p.year_select}</p>
          </div> */}
        </div>
      ))}
    </div>
  )
}
