import React, { useState, useEffect } from 'react';
import { fetchLocalResources } from '../utils/resourceData';
import './Resources.css';

const Resources = () => {
  const [activeTab, setActiveTab] = useState('fertilizers');
  const [location, setLocation] = useState('Murtizapur'); // Defaulting to your region
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load data whenever the tab or location changes
  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchLocalResources(activeTab, location);
    setItems(data);
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadData();
  };

  const getTabIcon = (tabId) => {
    if (tabId === 'fertilizers') return '🧪';
    if (tabId === 'bees') return '🐝';
    if (tabId === 'machinery') return '🚜';
  };

  const getTabTitle = (tabId) => {
    if (tabId === 'fertilizers') return 'Agri Inputs';
    if (tabId === 'bees') return 'Apiculture (Bees)';
    if (tabId === 'machinery') return 'Machinery Rentals';
  };

  return (
    <div className="resources-container" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '1rem' }}>
            Farmer <span className="text-gradient">Marketplace</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Find the nearest fertilizers, rent tractors, or buy bee colonies directly from verified local vendors.
          </p>
        </div>

        {/* Location Search Bar */}
        <div className="glass-card search-card" style={{ marginBottom: '2rem', padding: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '600px' }}>
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your city or village..." 
              className="resource-input"
              style={{ flexGrow: 1 }}
            />
            <button type="submit" className="btn btn-primary">
              📍 Search Area
            </button>
          </form>
        </div>

        {/* Custom Tabs */}
        <div className="tabs-container">
          {['fertilizers', 'bees', 'machinery'].map((tab) => (
            <button 
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="tab-icon">{getTabIcon(tab)}</span>
              {getTabTitle(tab)}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--primary)' }}>
            <div className="spinner"></div>
            <p style={{ marginTop: '1rem' }}>Scanning local vendors...</p>
          </div>
        ) : (
          /* Results Grid */
          <div className="resource-grid slide-up">
            {items.map((item) => (
              <div key={item.id} className="glass-card resource-card">
                <div className="card-header">
                  <span className="resource-type">{item.type}</span>
                  <span className={`stock-badge ${item.stock.includes('Low') ? 'warning' : 'success'}`}>
                    {item.stock}
                  </span>
                </div>
                
                <h3 className="item-name">{item.name}</h3>
                
                <div className="vendor-info">
                  <span className="vendor-name">🏪 {item.vendor}</span>
                  <span className="rating">⭐ {item.rating}</span>
                </div>

                <div className="location-info">
                  <span>📍 {item.city}</span>
                  <span className="distance">{item.distance} km away</span>
                </div>

                <div className="price-section">
                  <div className="price-tag">
                    <span className="currency">₹</span>
                    <span className="amount">{item.price}</span>
                  </div>
                  <button className="btn btn-primary btn-sm">
                    {activeTab === 'machinery' ? 'Book Now' : 'Contact Seller'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Resources;