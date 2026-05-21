import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

/**
 * Maps a product from DummyJSON to our local grocery category structure,
 * and enriches it with grocery-specific properties like unit sizes/weight.
 * Returns null if the product is not a grocery/household item.
 */
const mapAndEnrichProduct = (product) => {
  const title = product.title.toLowerCase();
  const apiCategory = product.category.toLowerCase();
  
  let shopType = null;
  let category = null;
  let unit = '1 pc';

  // 1. BAKERY shopType (check groceries with bakery terms first)
  if (apiCategory === 'groceries' && (
    title.includes('bread') || title.includes('toast') || title.includes('bun') ||
    title.includes('croissant') || title.includes('pastry') || title.includes('muffin') ||
    title.includes('cookie') || title.includes('biscuit') || title.includes('cake') ||
    title.includes('gateau') || title.includes('velvet') || title.includes('doughnut') ||
    title.includes('pie')
  )) {
    shopType = 'bakery';
    if (title.includes('bread') || title.includes('toast') || title.includes('bun')) {
      category = 'Bread';
      unit = '400g';
    } else if (title.includes('cake') || title.includes('gateau') || title.includes('velvet') || title.includes('pie')) {
      category = 'Cakes';
      unit = '1 unit';
    } else if (title.includes('cookie') || title.includes('biscuit') || title.includes('doughnut')) {
      category = 'Cookies';
      unit = '1 pack';
    } else {
      category = 'Pastries';
      unit = '4 pcs';
    }
  }
  // 2. GROCERY shopType
  else if (apiCategory === 'groceries' || apiCategory === 'kitchen-accessories') {
    shopType = 'grocery';
    if (title.includes('apple') || title.includes('banana') || title.includes('kiwi') || 
        title.includes('lemon') || title.includes('onion') || title.includes('potato') || 
        title.includes('tomato') || title.includes('cucumber') || title.includes('pepper') ||
        title.includes('fruit') || title.includes('berry') || title.includes('berries') || title.includes('pear')) {
      category = 'Fruits & Vegetables';
      unit = '1 lb';
    } else if (title.includes('chicken') || title.includes('beef') || title.includes('fish') || 
               title.includes('tuna') || title.includes('steak') || title.includes('pork') || title.includes('mutton') || title.includes('salmon')) {
      category = 'Meat & Fish';
      unit = '500g';
    } else if (title.includes('milk') || title.includes('egg') || title.includes('cheese') || 
               title.includes('butter') || title.includes('yogurt') || title.includes('cream')) {
      category = 'Dairy & Eggs';
      unit = '1 Liter';
      if (title.includes('egg')) unit = '12 pcs';
      if (title.includes('cheese') || title.includes('butter')) unit = '250g';
    } else if (title.includes('juice') || title.includes('water') || title.includes('soda') || 
               title.includes('cola') || title.includes('coffee') || title.includes('tea') || title.includes('drink')) {
      category = 'Beverages';
      unit = '1 Liter';
      if (title.includes('coffee') || title.includes('tea')) unit = '250g';
    } else if (title.includes('dog') || title.includes('cat') || title.includes('pet')) {
      category = 'Pet Care';
      unit = '1.5 kg';
    } else if (apiCategory === 'kitchen-accessories' || title.includes('cleaner') || title.includes('detergent') || title.includes('soap') || title.includes('brush') || title.includes('paper')) {
      category = 'Home & Cleaning';
      unit = '1 pc';
    } else {
      category = 'Cooking Essentials';
      unit = '500g';
      if (title.includes('oil')) unit = '1 Liter';
      if (title.includes('honey')) unit = '450g';
    }
  }
  // 3. MAKEUP shopType
  else if (apiCategory === 'beauty' || apiCategory === 'fragrances' || apiCategory === 'skin-care') {
    shopType = 'makeup';
    if (apiCategory === 'fragrances') {
      category = 'Fragrance';
      unit = '100 ml';
    } else if (apiCategory === 'skin-care') {
      category = 'Skincare';
      unit = '150 ml';
    } else if (title.includes('lipstick') || title.includes('lip') || title.includes('gloss')) {
      category = 'Lips';
      unit = '1 pc';
    } else if (title.includes('eye') || title.includes('mascara') || title.includes('shadow') || title.includes('lash') || title.includes('liner')) {
      category = 'Eyes';
      unit = '1 pc';
    } else {
      category = 'Face';
      unit = '1 unit';
    }
  }
  // 4. CLOTHING shopType
  else if (
    apiCategory === 'mens-shirts' || apiCategory === 'mens-shoes' || 
    apiCategory === 'womens-dresses' || apiCategory === 'womens-shoes' || 
    apiCategory === 'womens-bags' || apiCategory === 'tops' || 
    apiCategory === 'womens-jewellery'
  ) {
    shopType = 'clothing';
    if (apiCategory === 'mens-shirts' || apiCategory === 'tops') {
      category = 'Tops & Shirts';
      unit = '1 unit';
    } else if (apiCategory === 'womens-dresses') {
      category = 'Dresses';
      unit = '1 unit';
    } else if (apiCategory === 'womens-bags') {
      category = 'Bags';
      unit = '1 unit';
    } else if (apiCategory === 'womens-shoes' || apiCategory === 'mens-shoes') {
      category = 'Shoes';
      unit = '1 pair';
    } else {
      category = 'Accessories';
      unit = '1 pc';
    }
  }
  // 5. FURNITURE shopType
  else if (apiCategory === 'furniture' || apiCategory === 'home-decoration') {
    shopType = 'furniture';
    if (title.includes('chair') || title.includes('stool') || title.includes('bench')) {
      category = 'Chairs';
      unit = '1 pc';
    } else if (title.includes('table') || title.includes('desk') || title.includes('stand')) {
      category = 'Tables';
      unit = '1 pc';
    } else if (title.includes('sofa') || title.includes('couch') || title.includes('loveseat')) {
      category = 'Sofas';
      unit = '1 pc';
    } else if (title.includes('bed') || title.includes('mattress') || title.includes('wardrobe')) {
      category = 'Beds';
      unit = '1 pc';
    } else {
      category = 'Home Decor';
      unit = '1 pc';
    }
  }

  // Discard items that do not fit into any shopType
  if (!shopType || !category) {
    return null;
  }

  // Assign discount only to roughly 33% of products (e.g. ID divisible by 3)
  const hasDiscount = product.id % 3 === 0;
  const discountPercentage = hasDiscount ? Math.round(product.discountPercentage || 15) : 0;
  
  const price = product.price; // final price
  const originalPrice = discountPercentage > 0 
    ? parseFloat((price / (1 - discountPercentage / 100)).toFixed(2)) 
    : price;

  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: price,
    originalPrice: originalPrice,
    discountPercentage: discountPercentage,
    category: category,
    unit: unit,
    image: product.images && product.images.length > 0 ? product.images[0] : product.thumbnail,
    rating: product.rating || 4.5,
    stock: product.stock || 50,
    shopType: shopType,
  };
};

export const fetchProducts = async () => {
  try {
    // Fetch products from dummyjson (fetch 100 to get a large set)
    const response = await axios.get(`${API_BASE_URL}/products?limit=100`);
    
    if (response.data && response.data.products) {
      // Map and enrich all products, returning null for non-grocery products
      const allMapped = response.data.products.map(mapAndEnrichProduct);
      
      // Filter out null values (non-grocery products)
      return allMapped.filter(p => p !== null);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
