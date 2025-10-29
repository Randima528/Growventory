import { createServer } from "node:http";
import * as productController from "./productController.js";
import * as userController from "./userController.js";
import url from "node:url";
import { log } from "node:console";

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request for CORS
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;
  const method = req.method;

  // ============== USER AUTHENTICATION ROUTES ==============

  // POST /register - Register a new user
  if (pathname === "/register" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const userData = JSON.parse(body);
        
        // Validate required fields
        if (!userData.name || !userData.email || !userData.password) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Name, email, and password are required" }));
          return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Invalid email format" }));
          return;
        }

        // Password length validation
        if (userData.password.length < 6) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Password must be at least 6 characters long" }));
          return;
        }

        userController.registerUser(userData, (err, result) => {
          if (err) {
            if (err.message === "User already exists with this email") {
              res.writeHead(409, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: err.message }));
            } else {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Error registering user" }));
            }
          } else {
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
          }
        });
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON data" }));
      }
    });
  }

  // POST /login - Login user
  else if (pathname === "/login" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const userData = JSON.parse(body);

        // Validate required fields
        if (!userData.email || !userData.password) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Email and password are required" }));
          return;
        }

        userController.loginUser(userData, (err, result) => {
          if (err) {
            if (err.message === "Invalid email or password") {
              res.writeHead(401, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: err.message }));
            } else {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Error logging in" }));
            }
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
          }
        });
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON data" }));
      }
    });
  }

  // GET /users/:id - Get user by ID
  else if (pathname.match(/^\/users\/(\d+)$/) && method === "GET") {
    const id = pathname.split("/")[2];
    userController.getUserById(id, (err, result) => {
      if (err) {
        if (err.message === "User not found") {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: err.message }));
        } else {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Error fetching user" }));
        }
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      }
    });
  }

  // GET /users - Get all users
  else if (pathname === "/users" && method === "GET") {
    userController.getAllUsers((err, result) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Error fetching users" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      }
    });
  }

  // PUT /users/:id - Update user
  else if (pathname.match(/^\/users\/(\d+)$/) && method === "PUT") {
    const id = pathname.split("/")[2];
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const userData = JSON.parse(body);
        userController.updateUser(id, userData, (err, result) => {
          if (err) {
            if (err.message === "User not found") {
              res.writeHead(404, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: err.message }));
            } else {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Error updating user" }));
            }
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
          }
        });
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON data" }));
      }
    });
  }

  // DELETE /users/:id - Delete user
  else if (pathname.match(/^\/users\/(\d+)$/) && method === "DELETE") {
    const id = pathname.split("/")[2];
    userController.deleteUser(id, (err, result) => {
      if (err) {
        if (err.message === "User not found") {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: err.message }));
        } else {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Error deleting user" }));
        }
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      }
    });
  }

  // ============== PRODUCT ROUTES ==============

  // GET /dashboard - Get dashboard data with metrics
  else if (pathname === "/dashboard" && method === "GET") {
    productController.getDashboardData((err, dashboardData) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Error fetching dashboard data" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(dashboardData));
      }
    });
  }
  
  // GET /products - Get all products
  else if (pathname === "/products" && method === "GET") {
    const { search } = parsedUrl.query;
    productController.getAllProducts((err, products) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Error fetching products" }));
      } else {
        let filteredProducts = products;
        if (search) {
          filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
          );
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(filteredProducts));
      }
    });
  }
  
  // POST /products - Create new product
  else if (pathname === "/products" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const productData = JSON.parse(body);
      productController.createProduct(productData, (err, result) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Error creating product" }));
        } else {
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ id: result.insertId, ...productData }));
        }
      });
    });
  }
  
  // PUT /products/:id - Update product
  else if (pathname.match(/^\/products\/(\d+)$/) && method === "PUT") {
    const id = pathname.split("/")[2];
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const productData = JSON.parse(body);
      productController.updateProduct(id, productData, (err, result) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Error updating product" }));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: `Product ${id} updated` }));
        }
      });
    });
  }
  
  // DELETE /products/:id - Delete product
  else if (pathname.match(/^\/products\/(\d+)$/) && method === "DELETE") {
    const id = pathname.split("/")[2];
    productController.deleteProduct(id, (err, result) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Error deleting product" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: `Product ${id} deleted` }));
      }
    });
  }
  
  // 404 - Route not found
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
}).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
