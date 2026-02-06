import HeaderBar from '../components/HeaderBar'
import PhotoGallery from '../components/PhotoGallery'
import styles from './photogallery.module.css'

export default function GalleryPage() {
  return (
    <div className={styles.page}>
      <HeaderBar />
      <main className={styles.main}>
        <h2 className={styles.title}>Photo Gallery</h2>
        <PhotoGallery />
      </main>
    </div>
  )
}
