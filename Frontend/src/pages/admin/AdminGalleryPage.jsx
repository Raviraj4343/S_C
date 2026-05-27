import { useState } from "react";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import { uploadGalleryImage, removeGalleryImage } from "../../services/formService";
import { getAssetUrl } from "../../utils/url";

const AdminGalleryPage = () => {
  const { galleryImages, refreshAll } = useOutletContext();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      toast.error("Please select an image file");
      return;
    }

    setUploading(true);
    try {
      await uploadGalleryImage({ title, imageFile: file });
      toast.success("Image uploaded to gallery");
      setTitle("");
      setFile(null);
      refreshAll();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async (id) => {
    await removeGalleryImage(id);
    toast.success("Image deleted");
    refreshAll();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={onUpload} className="glass-card grid gap-3 rounded-2xl p-5 md:grid-cols-[1fr,1fr,auto]">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Image title"
          className="rounded-xl border border-edge bg-card px-4 py-3 text-foreground"
        />
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="rounded-xl border border-edge bg-card px-4 py-3 text-foreground"
        />
        <button disabled={uploading} className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white dark:bg-cyan-700">
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image) => (
          <article key={image._id} className="glass-card overflow-hidden rounded-2xl">
            <img src={getAssetUrl(image.imageUrl)} alt={image.title} className="h-44 w-full object-cover" />
            <div className="flex items-center justify-between p-3">
              <p className="text-sm font-medium text-foreground">{image.title}</p>
              <button onClick={() => onDelete(image._id)} className="rounded-lg border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-600">
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AdminGalleryPage;
