import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import { getCelebrations, saveCelebration, deleteCelebration } from '../../services/db';

const Celebrations = () => {
  const [celebrations, setCelebrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    occasionDate: '',
    orderDeadline: '',
    themeColor: 'pink',
    desktopBanner: '',
    mobileBanner: '',
    thumbnail: '',
    buttonText: 'Order Now',
    buttonUrl: '/menu',
    isActive: true,
    isFeatured: false,
    showOnHomepage: true,
    displayOrder: 0
  });

  const [desktopFile, setDesktopFile] = useState(null);
  const [mobileFile, setMobileFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const fetchCelebrations = async () => {
    setIsLoading(true);
    const data = await getCelebrations();
    setCelebrations(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCelebrations();
  }, []);

  const handleOpenModal = (celebration = null) => {
    setDesktopFile(null);
    setMobileFile(null);
    setThumbnailFile(null);
    if (celebration) {
      setFormData(celebration);
    } else {
      setFormData({
        id: 'mock-cel-' + Date.now(),
        name: '',
        slug: '',
        shortDescription: '',
        fullDescription: '',
        occasionDate: '',
        orderDeadline: '',
        themeColor: 'pink',
        desktopBanner: '',
        mobileBanner: '',
        thumbnail: '',
        buttonText: 'Order Now',
        buttonUrl: '/menu',
        isActive: true,
        isFeatured: false,
        showOnHomepage: true,
        displayOrder: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      await saveCelebration(formData, desktopFile, mobileFile, thumbnailFile);
      await fetchCelebrations();
      handleCloseModal();
      setSuccessMessage("Celebration successfully saved.");
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      alert("Failed to save celebration: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (type === 'desktop') {
        setDesktopFile(file);
        setFormData({ ...formData, desktopBanner: previewUrl });
      } else if (type === 'mobile') {
        setMobileFile(file);
        setFormData({ ...formData, mobileBanner: previewUrl });
      } else if (type === 'thumbnail') {
        setThumbnailFile(file);
        setFormData({ ...formData, thumbnail: previewUrl });
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this celebration?")) {
      await deleteCelebration(id);
      fetchCelebrations();
    }
  };

  const filteredCelebrations = celebrations.filter(c => c.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-sm flex justify-between items-center">
          <span className="font-medium">{successMessage}</span>
          <button onClick={() => setSuccessMessage('')} className="text-green-700 hover:text-green-900">
            <X size={18} />
          </button>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="font-headline-lg text-2xl text-primary">Celebrations</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus size={20} /> Add Celebration
        </button>
      </div>

      <div className="bg-surface rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="p-4 border-b border-outline-variant/30 bg-surface-container-low flex items-center">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Search celebrations..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none"
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-on-surface-variant">Loading celebrations...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50 text-on-surface-variant text-sm border-b border-outline-variant/30">
                <tr>
                  <th className="px-4 py-3 font-medium">Thumbnail</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Event Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filteredCelebrations.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-on-surface-variant">No celebrations found</td>
                  </tr>
                ) : (
                  filteredCelebrations.map(cel => (
                    <tr key={cel.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="px-4 py-3">
                        <img 
                          src={cel.thumbnail || 'https://via.placeholder.com/50'} 
                          alt={cel.name} 
                          className="w-12 h-12 object-cover rounded-md border border-outline-variant/30 bg-surface-variant"
                          onError={(e) => e.target.src = 'https://via.placeholder.com/50'}
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-on-surface">{cel.name}</td>
                      <td className="px-4 py-3 text-sm text-on-surface-variant">{cel.occasionDate ? new Date(cel.occasionDate).toLocaleDateString() : 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${cel.isActive ? 'bg-green-100 text-green-700' : 'bg-surface-dim text-on-surface-variant'}`}>
                          {cel.isActive ? 'Active' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleOpenModal(cel)} className="p-1 text-on-surface-variant hover:text-primary transition-colors mr-2">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(cel.id)} className="p-1 text-on-surface-variant hover:text-error transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Celebration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/30">
              <h2 className="text-xl font-bold text-primary">{formData.id && !formData.id.startsWith('mock-cel-') ? 'Edit Celebration' : 'Add New Celebration'}</h2>
              <button onClick={handleCloseModal} className="text-on-surface-variant hover:text-error">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="celebrationForm" onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">Occasion Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">Slug (URL)</label>
                    <input 
                      type="text" 
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">Occasion Date *</label>
                    <input 
                      type="date" 
                      required
                      value={formData.occasionDate}
                      onChange={(e) => setFormData({...formData, occasionDate: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">Order Deadline *</label>
                    <input 
                      type="date" 
                      required
                      value={formData.orderDeadline}
                      onChange={(e) => setFormData({...formData, orderDeadline: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-on-surface mb-2">Short Description</label>
                    <input 
                      type="text" 
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none"
                      maxLength={150}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-on-surface mb-2">Theme Color</label>
                    <select 
                      value={formData.themeColor}
                      onChange={(e) => setFormData({...formData, themeColor: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none"
                    >
                      <option value="pink">Pink / Rose</option>
                      <option value="blue">Blue / Ocean</option>
                      <option value="amber">Amber / Gold</option>
                      <option value="emerald">Emerald / Green</option>
                      <option value="purple">Purple / Lavender</option>
                    </select>
                  </div>
                  
                  {/* Image Uploads */}
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">Thumbnail Image</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'thumbnail')}
                      className="w-full text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                    {formData.thumbnail && (
                      <div className="mt-2 relative w-24 h-24 rounded-lg overflow-hidden border border-outline-variant">
                        <img src={formData.thumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">Desktop Banner Image</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'desktop')}
                      className="w-full text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                    {formData.desktopBanner && (
                      <div className="mt-2 relative w-full h-24 rounded-lg overflow-hidden border border-outline-variant">
                        <img src={formData.desktopBanner} alt="Desktop preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">Mobile Banner Image</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'mobile')}
                      className="w-full text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                    {formData.mobileBanner && (
                      <div className="mt-2 relative w-24 h-40 rounded-lg overflow-hidden border border-outline-variant">
                        <img src={formData.mobileBanner} alt="Mobile preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  
                  {/* Toggles */}
                  <div className="md:col-span-2 flex flex-wrap gap-6 pt-4 border-t border-outline-variant/30">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                        className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                      />
                      <span className="text-on-surface font-medium">Active</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                        className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                      />
                      <span className="text-on-surface font-medium">Featured</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formData.showOnHomepage}
                        onChange={(e) => setFormData({...formData, showOnHomepage: e.target.checked})}
                        className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                      />
                      <span className="text-on-surface font-medium">Show on Homepage</span>
                    </label>
                  </div>

                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-outline-variant/30 flex justify-end gap-3 bg-surface-container-low">
              <button 
                type="button"
                onClick={handleCloseModal}
                className="px-6 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-variant font-medium transition-colors"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button 
                type="submit"
                form="celebrationForm"
                className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 font-medium transition-colors flex items-center gap-2"
                disabled={isUploading}
              >
                {isUploading ? 'Saving...' : 'Save Celebration'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Celebrations;
