/**
 * Fake Crop Data Generator
 * Used for testing the crop analysis dashboard without actual rover camera
 */

export const generateFakeCropImage = () => {
  return {
    imageId: `IMG_${Date.now()}`,
    imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=400&h=400&fit=crop",
    fileName: "crop_sample.jpg",
    captureTime: new Date().toISOString(),
    roverId: "ROVER_001",
    gpsCoordinates: {
      latitude: 20.5937,
      longitude: 78.9629
    }
  };
};

export const generateFakeCropAnalysis = (sensorData) => {
  // Calculate health score based on sensor conditions
  const calculateHealthScore = () => {
    let score = 100;
    
    if (sensorData?.temperature) {
      if (sensorData.temperature < 15 || sensorData.temperature > 35) {
        score -= 15;
      }
    }
    
    if (sensorData?.humidity) {
      if (sensorData.humidity < 30 || sensorData.humidity > 80) {
        score -= 10;
      }
    }
    
    if (sensorData?.aqi) {
      if (sensorData.aqi > 100) {
        score -= 20;
      } else if (sensorData.aqi > 50) {
        score -= 10;
      }
    }
    
    return Math.max(0, Math.min(100, score));
  };

  const assessDiseaseRisk = () => {
    if (sensorData?.humidity > 75 && sensorData?.temperature > 25) {
      return "High";
    }
    if (sensorData?.humidity > 65 && sensorData?.temperature > 20) {
      return "Moderate";
    }
    return "Low";
  };

  const assessWaterNeed = () => {
    if (sensorData?.humidity < 40) {
      return "High";
    }
    if (sensorData?.humidity < 55) {
      return "Moderate";
    }
    return "Low";
  };

  const estimateGrowthStage = () => {
    if (sensorData?.temperature > 28 && sensorData?.humidity > 60) {
      return "Flowering";
    }
    if (sensorData?.temperature > 25) {
      return "Vegetative";
    }
    return "Germination";
  };

  const generateRecommendations = () => {
    const recommendations = [];
    
    if (sensorData?.humidity < 40) {
      recommendations.push("Increase Irrigation");
    }
    if (sensorData?.humidity > 75) {
      recommendations.push("Improve Drainage");
    }
    
    if (sensorData?.humidity > 75 && sensorData?.temperature > 25) {
      recommendations.push("Use Fungicide");
    } else if (sensorData?.humidity > 65) {
      recommendations.push("Use Neem Spray");
    }
    
    if (sensorData?.temperature > 28) {
      recommendations.push("Apply NPK Fertilizer");
    }
    
    if (recommendations.length === 0) {
      recommendations.push("Maintain Current Conditions");
      recommendations.push("Monitor Crop Growth");
    }
    
    return recommendations.slice(0, 4);
  };

  return {
    healthScore: calculateHealthScore(),
    diseaseRisk: assessDiseaseRisk(),
    waterNeed: assessWaterNeed(),
    growthStage: estimateGrowthStage(),
    soilMoisture: sensorData?.humidity || 65,
    pm25: sensorData?.aqi || 45,
    recommendations: generateRecommendations()
  };
};

/**
 * Simulates a complete crop data response
 * Useful for testing without active rover
 */
export const getSimulatedCropData = (sensorData) => {
  return {
    image: generateFakeCropImage(),
    analysis: generateFakeCropAnalysis(sensorData)
  };
};
