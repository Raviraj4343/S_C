import { useEffect, useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import { fetchGalleryImages } from "../../services/formService";
import { getAssetUrl } from "../../utils/url";

const GallerySection = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetchGalleryImages();
        setImages(response.data || []);
      } catch {
        setImages([]);
      }
    };

    load();
  }, []);

  if (!images.length) return null;

  return (
    <section className="section-shell mt-24">
      <SectionTitle eyebrow="Gallery" title="Moments From The Field" subtitle="Snapshots of volunteers and communities creating impact together." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <article key={image._id} className="glass-card overflow-hidden rounded-2xl">
            <img src={getAssetUrl(image.imageUrl)} alt={image.title} className="h-56 w-full object-cover" loading="lazy" />
            <div className="p-4">
              <p className="font-medium text-foreground">{image.title}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
