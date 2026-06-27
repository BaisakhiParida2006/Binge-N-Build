const cleanMerchant = require("../services/merchantCleaner");

exports.cleanMerchantName = async (req, res) => {

  try {

    const { merchant } = req.body;

    if (!merchant) {

      return res.status(400).json({
        success: false,
        message: "Merchant name is required"
      });

    }

    const result = cleanMerchant(merchant);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
