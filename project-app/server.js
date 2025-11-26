const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Sample data
let products = [
  {
    id: 1,
    name: 'Casual Shoe',
    price: 225,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'shoes',
    stock: 50,
    description: 'Comfortable casual shoes for everyday wear',
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: 'Skateboard Shoe',
    price: 125,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'shoes',
    stock: 30,
    description: 'Durable skateboard shoes for active lifestyle',
    rating: 4.2,
    reviews: 89
  },
  {
    id: 3,
    name: 'Basket Shoe',
    price: 199,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'shoes',
    stock: 25,
    description: 'High-performance basketball shoes',
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: 'Sportwear Shoe',
    price: 99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'shoes',
    stock: 40,
    description: 'Lightweight sportswear shoes',
    rating: 4.3,
    reviews: 92
  }
];

let orders = [];
let nextOrderId = 1;

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
  const { category, search, limit = 20, offset = 0 } = req.query;
  
  let filteredProducts = [...products];
  
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  const paginatedProducts = filteredProducts.slice(
    parseInt(offset), 
    parseInt(offset) + parseInt(limit)
  );
  
  res.json({
    products: paginatedProducts,
    total: filteredProducts.length,
    limit: parseInt(limit),
    offset: parseInt(offset)
  });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

// Create new product (Admin only)
app.post('/api/products', (req, res) => {
  const { name, price, category, stock, description, image } = req.body;
  
  if (!name || !price || !category || !stock || !image) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newProduct = {
    id: Math.max(...products.map(p => p.id)) + 1,
    name,
    price: parseFloat(price),
    category,
    stock: parseInt(stock),
    description: description || '',
    image,
    rating: 0,
    reviews: 0
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update product (Admin only)
app.put('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const { name, price, category, stock, description, image } = req.body;
  
  products[productIndex] = {
    ...products[productIndex],
    name: name || products[productIndex].name,
    price: price ? parseFloat(price) : products[productIndex].price,
    category: category || products[productIndex].category,
    stock: stock ? parseInt(stock) : products[productIndex].stock,
    description: description || products[productIndex].description,
    image: image || products[productIndex].image
  };
  
  res.json(products[productIndex]);
});

// Delete product (Admin only)
app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  products.splice(productIndex, 1);
  res.json({ message: 'Product deleted successfully' });
});

// Create order
app.post('/api/orders', (req, res) => {
  const { items, customerInfo, total } = req.body;
  
  if (!items || !customerInfo || !total) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newOrder = {
    id: nextOrderId++,
    items,
    customerInfo,
    total: parseFloat(total),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Get orders (Admin only)
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Update order status (Admin only)
app.put('/api/orders/:id', (req, res) => {
  const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
  
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  const { status } = req.body;
  
  if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  orders[orderIndex].status = status;
  orders[orderIndex].updatedAt = new Date().toISOString();
  
  res.json(orders[orderIndex]);
});

// Get dashboard stats (Admin only)
app.get('/api/dashboard/stats', (req, res) => {
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  
  res.json({
    totalProducts,
    totalOrders,
    totalRevenue,
    pendingOrders
  });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
