const merchantMap = {
  "NETFLIX": {
    name: "Netflix",
    category: "Entertainment"
  },

  "SPOTIFY": {
    name: "Spotify",
    category: "Entertainment"
  },

  "AMAZON": {
    name: "Amazon",
    category: "Shopping"
  },

  "AMZN": {
    name: "Amazon",
    category: "Shopping"
  },

  "SWIGGY": {
    name: "Swiggy",
    category: "Food"
  },

  "ZOMATO": {
    name: "Zomato",
    category: "Food"
  },

  "GOOGLE": {
    name: "Google",
    category: "Technology"
  },

  "APPLE": {
    name: "Apple",
    category: "Technology"
  },

  "UBER": {
    name: "Uber",
    category: "Transport"
  },

  "OLA": {
    name: "Ola",
    category: "Transport"
  }
};

const cleanMerchant = (merchantName) => {

  const upper = merchantName.toUpperCase();

  for (const key in merchantMap) {

    if (upper.includes(key)) {

      return {
        originalMerchant: merchantName,
        cleanedMerchant: merchantMap[key].name,
        category: merchantMap[key].category
      };

    }

  }

  return {
    originalMerchant: merchantName,
    cleanedMerchant: merchantName,
    category: "Others"
  };

};

module.exports = cleanMerchant;