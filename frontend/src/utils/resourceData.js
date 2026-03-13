// frontend/src/utils/resourceData.js

// Mock Database of Resources
const mockResources = {
  fertilizers: [
    { id: 'f1', name: 'IFFCO Urea (45kg)', type: 'Fertilizer', vendor: 'Kisan Agro Kendra', price: 266, distance: 4.2, rating: 4.8, stock: 'In Stock', city: 'Murtizapur' },
    { id: 'f2', name: 'Coromandel DAP', type: 'Fertilizer', vendor: 'Patil Fertilizers', price: 1350, distance: 7.5, rating: 4.5, stock: 'Low Stock', city: 'Murtizapur' },
    { id: 'f3', name: 'Tata Rallis Termex', type: 'Pesticide', vendor: 'AgriTech Solutions', price: 450, distance: 2.1, rating: 4.9, stock: 'In Stock', city: 'Akola' },
    { id: 'f4', name: 'Urea (50kg)', type: 'Fertilizer', vendor: 'Pune Agro Retail', price: 270, distance: 5.5, rating: 4.6, stock: 'In Stock', city: 'Pune' },
    { id: 'f5', name: 'NPK 19:19:19', type: 'Fertilizer', vendor: 'Shivaji Traders', price: 1400, distance: 3.2, rating: 4.7, stock: 'Out of Stock', city: 'Pune' },
    { id: 'f6', name: 'Mahadhan Smartek', type: 'Fertilizer', vendor: 'Kisan Krushi Seva', price: 1450, distance: 8.1, rating: 4.4, stock: 'In Stock', city: 'Nagpur' }
  ],
  bees: [
    { id: 'b1', name: 'Italian Bee Colony (Apis mellifera)', type: 'Pollinators', vendor: 'National Bee Board Breeder', price: 3500, distance: 15.0, rating: 4.9, stock: '5 Boxes Left', city: 'Akola' },
    { id: 'b2', name: 'Indian Bee (Apis cerana indica)', type: 'Pollinators', vendor: 'Local Honey Farm', price: 2800, distance: 8.4, rating: 4.6, stock: 'Available', city: 'Murtizapur' },
    { id: 'b3', name: 'Empty Beehive Box (ISI Standard)', type: 'Equipment', vendor: 'Woodcraft Industries', price: 1200, distance: 12.0, rating: 4.3, stock: 'In Stock', city: 'Amravati' },
    { id: 'b4', name: 'Apis Mellifera Colony', type: 'Pollinators', vendor: 'Pune Bee Farm', price: 3600, distance: 10.0, rating: 4.8, stock: 'Available', city: 'Pune' },
    { id: 'b5', name: 'Honey Extractor Machine', type: 'Equipment', vendor: 'Agri Implements Hub', price: 8500, distance: 14.5, rating: 4.5, stock: '2 Units Left', city: 'Nagpur' }
  ],
  machinery: [
    { id: 'm1', name: 'Mahindra 575 DI Tractor', type: 'Rent per Hour', vendor: 'Ramesh Farm Services', price: 600, distance: 3.5, rating: 4.7, stock: 'Available Today', city: 'Murtizapur' },
    { id: 'm2', name: 'Heavy Duty Rotavator', type: 'Rent per Hour', vendor: 'Kisan Custom Hiring', price: 400, distance: 5.1, rating: 4.4, stock: 'Available Tomorrow', city: 'Murtizapur' },
    { id: 'm3', name: 'Combine Harvester', type: 'Rent per Acre', vendor: 'Singh Harvesters', price: 1500, distance: 22.0, rating: 4.9, stock: 'Book 2 Days Prior', city: 'Akola' },
    { id: 'm4', name: 'John Deere 5050D Tractor', type: 'Rent per Hour', vendor: 'Deshmukh Equipment', price: 650, distance: 6.0, rating: 4.8, stock: 'Available Today', city: 'Pune' },
    { id: 'm5', name: 'Pneumatic Planter', type: 'Rent per Hour', vendor: 'Pune Agro Machineries', price: 500, distance: 4.5, rating: 4.6, stock: 'Advance Booking', city: 'Pune' },
    { id: 'm6', name: 'Sugarcane Harvester', type: 'Rent per Tonne', vendor: 'Vidarbha Hiring Center', price: 350, distance: 18.0, rating: 4.5, stock: 'Available Next Week', city: 'Nagpur' }
  ]
};

// Function to fetch resources based on category and user's city
export const fetchLocalResources = async (category, userCity) => {
  // Simulate network delay for realistic loading state
  await new Promise(resolve => setTimeout(resolve, 800));

  const allCategoryData = mockResources[category] || [];
  
  if (!userCity || userCity.trim() === '') {
    // If no city is provided, return all sorted by distance
    return allCategoryData.sort((a, b) => a.distance - b.distance);
  }

  // Filter the data based on the city (case-insensitive substring match)
  const cityQuery = userCity.toLowerCase().trim();
  const filteredData = allCategoryData.filter(item => 
    item.city.toLowerCase().includes(cityQuery)
  );
  
  // Sort the filtered results by distance
  return filteredData.sort((a, b) => a.distance - b.distance);
};