import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Settings = () => {
  const [trendingFlavors, setTrendingFlavors] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        if (data.trendingFlavors && Array.isArray(data.trendingFlavors)) {
          setTrendingFlavors(data.trendingFlavors.join(', '));
        }
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Convert comma-separated string to array, trimming whitespace and removing empty items
    const flavorsArray = trendingFlavors
      .split(',')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trendingFlavors: flavorsArray })
      });

      if (response.ok) {
        toast.success('Settings saved successfully!');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('An error occurred while saving');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-headline-md text-3xl font-bold text-primary">Store Settings</h1>
        </div>

        <div className="bg-surface-container-low rounded-xl shadow-md p-6">
          <h2 className="font-headline-md text-xl text-primary mb-4">Home Page Configurations</h2>
          
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">
                Trending Flavors
              </label>
              <p className="text-xs text-on-surface-variant mb-3">
                Enter the flavors you want to show under the search bar on the Home page, separated by commas. 
                (e.g., birthday, chocolate, bento, red velvet)
              </p>
              <textarea
                value={trendingFlavors}
                onChange={(e) => setTrendingFlavors(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="chocolate, vanilla, strawberry..."
              ></textarea>
            </div>

            <div className="flex justify-end pt-4 border-t border-outline-variant/30">
              <button
                type="submit"
                disabled={isSaving}
                className={`bg-primary text-on-primary px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2 ${
                  isSaving ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSaving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
