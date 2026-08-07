import React, { useState, useEffect } from 'react';
import { ImageIcon } from 'lucide-react';
import { getGalleryImages } from '../services/db';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGalleryImages();
        setImages(data);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <main className="min-h-screen bg-[#FDFBF7] dark:bg-[#12041C] pt-36 pb-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ImageIcon size={40} className="text-[#0D47A1]" />
            <h1 className="font-headline-xl text-3xl md:text-5xl text-[#0D47A1] font-bold">
              Our Gallery
            </h1>
          </div>
          <p className="text-[#6B1FA6] max-w-2xl mx-auto text-lg">
            A visual showcase of our finest creations. From elegant weddings to fun birthdays, see how we bring sweet moments to life.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0D47A1]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
            {images.map((image) => (
              <div 
                key={image.id}
                className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 bg-white"
              >
                <img 
                  src={image.imageUrl} 
                  alt={image.altText || 'Gallery Image'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A0845]/90 via-[#2A0845]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-medium text-lg drop-shadow-md">
                      {image.altText || 'Beautiful Creation'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center bg-white dark:bg-[#1D0A2D] p-8 rounded-3xl shadow-sm border border-[#0D47A1]/10">
          <h2 className="text-2xl font-bold text-[#0D47A1] mb-4">Have a custom design in mind?</h2>
          <p className="text-[#6B1FA6] mb-6 max-w-xl mx-auto">We can turn your dream cake into reality. Send us your inspiration photos and we'll craft something unique just for you.</p>
          <a href="/custom-order" className="inline-block px-8 py-3 bg-[#F5C242] text-[#0D47A1] font-bold rounded-full hover:bg-[#0D47A1] hover:text-white transition-colors">
            Request Custom Order
          </a>
        </div>
      </section>
    </main>
  );
};

export default Gallery;
