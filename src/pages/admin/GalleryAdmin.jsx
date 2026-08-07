import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, UploadCloud } from 'lucide-react';
import { getGalleryImages, saveGalleryImage, deleteGalleryImage, uploadImage } from '../../services/db';
import toast from 'react-hot-toast';

const GalleryAdmin = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const data = await getGalleryImages();
      setImages(data);
    } catch (error) {
      toast.error("Failed to load gallery images");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    toast.loading("Uploading image...", { id: "upload" });
    
    try {
      const imageUrl = await uploadImage(file);
      
      if (imageUrl) {
        await saveGalleryImage({
          imageUrl,
          altText: file.name
        });
        toast.success("Image added to gallery!", { id: "upload" });
        fetchImages();
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      toast.error("Failed to upload image", { id: "upload" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image from the gallery?")) return;
    
    try {
      await deleteGalleryImage(id);
      toast.success("Image deleted");
      fetchImages();
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-headline-md text-2xl font-bold text-primary">Gallery Management</h1>
          <p className="text-on-surface-variant">Upload and manage images displayed on the public Gallery page.</p>
        </div>
        <div>
          <label className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 cursor-pointer shadow-sm">
            <UploadCloud size={20} />
            {isUploading ? "Uploading..." : "Upload New Image"}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload} 
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : images.length === 0 ? (
        <div className="bg-surface rounded-xl p-12 text-center border border-outline-variant/30">
          <ImageIcon className="mx-auto h-12 w-12 text-on-surface-variant/50 mb-4" />
          <h3 className="text-lg font-medium text-on-surface mb-1">No images yet</h3>
          <p className="text-on-surface-variant">Upload your first image to showcase it in the gallery.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div key={img.id} className="bg-surface rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm group">
              <div className="aspect-square relative overflow-hidden bg-surface-variant/30">
                <img 
                  src={img.imageUrl} 
                  alt={img.altText || "Gallery item"} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => handleDelete(img.id)}
                    className="bg-error text-on-error p-3 rounded-full hover:scale-110 transition-transform shadow-lg"
                    title="Delete Image"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm text-on-surface-variant truncate" title={img.altText}>{img.altText}</p>
                <p className="text-xs text-on-surface-variant/70 mt-1">{new Date(img.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryAdmin;
