import express from "express";
import dataGovService from "../services/dataGovService.js";

const router = express.Router();

// @route   GET /api/sales/market-prices
// @desc    Get highest profit market prices based on location and crop
// @access  Public
router.get('/market-prices', async (req, res) => {
  try {
    const { state, district, crop } = req.query;
    
    // Validate that at least one filter is provided
    if (!state && !district && !crop) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide at least a state, district, or crop.' 
      });
    }

    const records = await dataGovService.getMarketPrices({ state, district, crop });

    res.json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (error) {
    console.error('Error in market-prices route:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error: Unable to fetch market prices' 
    });
  }
});

export default router;
