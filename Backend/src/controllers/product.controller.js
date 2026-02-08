import pool from "../config/db.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, stock } = req.body;

    const image = req.file
      ? `/uploads/products/${req.file.filename}`
      : null;

    const result = await pool.query(
      `INSERT INTO products (title, description, price, image, stock)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [title, description, price, image, stock]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Product creation failed" });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM products WHERE id=$1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};
