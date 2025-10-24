import db from "./db.js";

// GET all products
export const getAllProducts = (callback) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    callback(err, result);
  });
};

// GET a single product by ID
export const getProductById = (id, callback) => {
  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    callback(err, result[0]); //The first item from the results array. Since IDs are typically unique, the query should return at most one record
  });
};

// CREATE a new product
export const createProduct = (productData, callback) => {
  const sql = "INSERT INTO products SET ?";
  db.query(sql, [productData], (err, result) => {
    callback(err, result);
  });
};

// UPDATE a product
export const updateProduct = (id, productData, callback) => {
  const sql = "UPDATE products SET ? WHERE id = ?";
  db.query(sql, [productData, id], (err, result) => {
    callback(err, result);
  });
};

// DELETE a product
export const deleteProduct = (id, callback) => {
  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    callback(err, result);
  });
};

// GET dashboard data with all metrics
export const getDashboardData = (callback) => {
  const sql = "SELECT * FROM products";
  
  db.query(sql, (err, products) => {
    if (err) {
      callback(err, null);
      return;
    }

    // Calculate metrics
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + (parseFloat(p.price) * parseInt(p.stock)), 0);
    const outOfStock = products.filter(p => parseInt(p.stock) === 0).length;
    const lowStock = products.filter(p => parseInt(p.stock) > 0 && parseInt(p.stock) < 10).length;
    const inStock = products.filter(p => parseInt(p.stock) >= 10).length;
    const avgPrice = totalProducts > 0 ? (products.reduce((sum, p) => sum + parseFloat(p.price), 0) / totalProducts) : 0;
    const totalStock = products.reduce((sum, p) => sum + parseInt(p.stock), 0);

    // Get low stock products (stock > 0 and stock < 10)
    const lowStockProducts = products
      .filter(p => parseInt(p.stock) > 0 && parseInt(p.stock) < 10)
      .sort((a, b) => parseInt(a.stock) - parseInt(b.stock))
      .slice(0, 5);

    // Get out of stock products
    const outOfStockProducts = products
      .filter(p => parseInt(p.stock) === 0)
      .slice(0, 5);

    // Top products by value (price * stock)
    const topProducts = [...products]
      .map(p => ({
        ...p,
        totalValue: parseFloat(p.price) * parseInt(p.stock)
      }))
      .sort((a, b) => b.totalValue - a.totalValue)
      .slice(0, 5);

    // Prepare response
    const dashboardData = {
      metrics: {
        totalProducts,
        totalValue: totalValue.toFixed(2),
        outOfStock,
        lowStock,
        inStock,
        avgPrice: avgPrice.toFixed(2),
        totalStock
      },
      lowStockProducts: lowStockProducts.map(p => ({
        id: p.id,
        name: p.name,
        price: parseFloat(p.price),
        stock: parseInt(p.stock)
      })),
      outOfStockProducts: outOfStockProducts.map(p => ({
        id: p.id,
        name: p.name,
        price: parseFloat(p.price),
        stock: parseInt(p.stock)
      })),
      topProducts: topProducts.map(p => ({
        id: p.id,
        name: p.name,
        price: parseFloat(p.price),
        stock: parseInt(p.stock),
        totalValue: p.totalValue
      })),
      allProducts: products.map(p => ({
        id: p.id,
        name: p.name,
        price: parseFloat(p.price),
        stock: parseInt(p.stock)
      }))
    };

    callback(null, dashboardData);
  });
};