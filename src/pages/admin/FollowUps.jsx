import { useState, useEffect } from 'react';
import { Search, MessageCircle, Calendar } from 'lucide-react';
import { getOrders } from '../../services/db';

const FollowUps = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchOrders = async () => {
    setIsLoading(true);
    const data = await getOrders();
    setOrders(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Helper to calculate next occurrence of a date
  const getNextOccurrence = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    
    const today = new Date();
    const nextOccurrence = new Date(today.getFullYear(), date.getMonth(), date.getDate());
    
    // If it already passed this year, it's next year
    if (nextOccurrence < today) {
      nextOccurrence.setFullYear(today.getFullYear() + 1);
    }
    return nextOccurrence;
  };

  const getDaysUntil = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);
    const diffTime = Math.abs(target - today);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Filter orders that have valid customer info
  const followUpList = orders
    .filter(order => order.customer && order.customer.name && order.customer.phone)
    .map(order => {
      // Base the follow-up on Occasion Date, or fallback to the Purchase Date
      const baseDate = order.customer.occasionDate || order.createdAt;
      const nextOccurrence = getNextOccurrence(baseDate);
      const daysUntil = nextOccurrence ? getDaysUntil(nextOccurrence) : null;
      
      return {
        ...order,
        nextOccurrence,
        daysUntil,
        occasion: order.customer.occasion || 'Anniversary/Birthday'
      };
    })
    .filter(item => item.nextOccurrence !== null)
    .sort((a, b) => a.daysUntil - b.daysUntil);

  const filteredList = followUpList.filter(o => 
    o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.phone.includes(search)
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="font-headline-lg text-2xl text-primary">Customer Follow-ups</h1>
      </div>

      <div className="bg-surface rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden mb-6">
        <div className="p-4 border-b border-outline-variant/30 bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Search by name or phone..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none"
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-on-surface-variant">Loading follow-ups...</div>
        ) : filteredList.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant">No upcoming follow-ups found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50 text-on-surface-variant text-sm border-b border-outline-variant/30">
                <tr>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Last Purchase</th>
                  <th className="px-4 py-3 font-medium">Occasion</th>
                  <th className="px-4 py-3 font-medium">Upcoming Date</th>
                  <th className="px-4 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filteredList.map(item => {
                  const isSoon = item.daysUntil <= 30;
                  const formattedDate = item.nextOccurrence.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  
                  const message = `Hello ${item.customer.name}, you have a ${item.occasion.toLowerCase()} coming up on ${formattedDate}. Would you like to purchase a cake from Cake Snow Bakery?`;
                  const whatsappUrl = `https://wa.me/${item.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

                  return (
                    <tr key={item.id} className={`hover:bg-surface-container-low/50 transition-colors ${isSoon ? 'bg-orange-50/50' : ''}`}>
                      <td className="px-4 py-4">
                        <div className="font-medium text-on-surface">{item.customer.name}</div>
                        <div className="text-sm text-on-surface-variant">{item.customer.phone}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-on-surface-variant">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-primary">
                        {item.occasion}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className={isSoon ? 'text-orange-500' : 'text-on-surface-variant'} />
                          <span className={`font-medium ${isSoon ? 'text-orange-600' : 'text-on-surface'}`}>
                            {formattedDate}
                          </span>
                        </div>
                        {isSoon && <div className="text-xs text-orange-600 font-bold mt-1">In {item.daysUntil} days</div>}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <a 
                          href={whatsappUrl}
                          target="_blank" rel="noreferrer"
                          className="inline-flex bg-[#25D366] text-white px-4 py-2 rounded-lg items-center gap-2 font-medium hover:bg-[#128C7E] transition-colors text-sm shadow-sm"
                        >
                          <MessageCircle size={16} /> Follow Up
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowUps;
