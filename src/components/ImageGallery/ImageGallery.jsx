import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={css.gallery}>
      {images.map((item, index) => (
        <li key={item.id} className={css.galleryItem}>
          <ImageCard image={item} onClick={() => onImageClick(item, index)} />
        </li>
      ))}
    </ul>
  );
}
