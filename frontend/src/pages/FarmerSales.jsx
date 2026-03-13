import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FarmerSales.css';

const FarmerSales = () => {
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    crop: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // Common Indian states & crops for dropdowns
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];
  
  const commonCrops = [
    "Wheat", "Rice", "Maize", "Cotton", "Sugarcane", "Soyabean", 
    "Groundnut", "Mustard", "Onion", "Potato", "Tomato", "Apple", "Mango"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchMarketData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await axios.get('http://localhost:5000/api/sales/market-prices', {
        params: {
          state: formData.state,
          district: formData.district,
          crop: formData.crop
        }
      });

      if (response.data && response.data.data) {
        setResults(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching market data:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch market data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="farmer-sales-container">
      {/* Background gradients similar to dashboard */}
      <div className="bg-gradient-top"></div>
      <div className="bg-gradient-bottom"></div>

      <div className="sales-content">
        <header className="sales-header">
          <h1>High-Profit Market Locator</h1>
          <p>Find the best markets to sell your crops for maximum profit based on real-time data from Data.gov.in</p>
        </header>

        <section className="search-section">
          <form onSubmit={fetchMarketData} className="search-form">
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                list="state-list"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="e.g. Maharashtra"
                className="glass-input"
              />
              <datalist id="state-list">
                {states.map((state, idx) => (
                  <option key={idx} value={state} />
                ))}
              </datalist>
            </div>

            <div className="form-group">
              <label htmlFor="district">District</label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                placeholder="e.g. Pune"
                className="glass-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="crop">Crop / Commodity</label>
              <input
                type="text"
                id="crop"
                name="crop"
                list="crop-list"
                value={formData.crop}
                onChange={handleInputChange}
                placeholder="e.g. Wheat"
                className="glass-input"
              />
              <datalist id="crop-list">
                {commonCrops.map((crop, idx) => (
                  <option key={idx} value={crop} />
                ))}
              </datalist>
            </div>

            <button type="submit" className="search-btn" disabled={loading || (!formData.state && !formData.district && !formData.crop)}>
              {loading ? <span className="spinner"></span> : 'Find Best Markets'}
            </button>
          </form>
        </section>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span> {error}
          </div>
        )}

        {results.length > 0 && (
          <section className="results-section">
            <div className="results-header">
              <h2>Top Markets Found ({results.length})</h2>
              <span className="sorted-badge">Sorted by Highest Profit (Modal Price)</span>
            </div>

            <div className="results-grid">
              {results.map((item, index) => (
                <div key={index} className={`market-card ${index === 0 ? 'top-profit' : ''}`}>
                  {index === 0 && <div className="top-profit-badge">⭐ Highest Profit</div>}
                  
                  <div className="market-card-header">
                    <h3>{item.market}</h3>
                    <span className="location">{item.district}, {item.state}</span>
                  </div>

                  <div className="market-details">
                    <div className="detail-row">
                      <span className="label">Commodity:</span>
                      <span className="value font-semibold">{item.commodity} ({item.variety})</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Grade:</span>
                      <span className="value">{item.grade || 'N/A'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Arrival Date:</span>
                      <span className="value">{item.arrival_date}</span>
                    </div>
                  </div>

                  <div className="price-section">
                    <div className="price-box modal-price">
                      <span className="price-label">Modal Price (Avg)</span>
                      <span className="price-value">₹{item.modal_price}/Qtl</span>
                    </div>
                    
                    <div className="price-range">
                      <div className="price-box min">
                        <span className="price-label">Min</span>
                        <span className="price-value">₹{item.min_price}</span>
                      </div>
                      <div className="price-box max">
                        <span className="price-label">Max</span>
                        <span className="price-value">₹{item.max_price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {!loading && !error && results.length === 0 && (formData.state || formData.district || formData.crop) && (
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <p>No market data found for the selected criteria. Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerSales;
