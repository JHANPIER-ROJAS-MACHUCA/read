const express = require("express");
const router = express.Router();
const db = require("../db");

// LISTAR PRODUCTOS
router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT * FROM producto
      ORDER BY id_producto
    `);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

// REGISTRAR PRODUCTO
router.post("/", async (req, res) => {
  try {
    const { descripcion, precio, stock, id_categoria, id_proveedor } = req.body;

    await db.query(
      `INSERT INTO producto (descripcion, precio, stock, id_categoria, id_proveedor)
       VALUES ($1, $2, $3, $4, $5)`,
      [descripcion, precio, stock, id_categoria, id_proveedor]
    );

    res.json({ mensaje: "Producto registrado correctamente" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ACTUALIZAR PRODUCTO
router.put("/:id", async (req, res) => {
  try {
    const { descripcion, precio, stock, id_categoria, id_proveedor } = req.body;
    const id = req.params.id;

    await db.query(
      `UPDATE producto
       SET descripcion=$1,
           precio=$2,
           stock=$3,
           id_categoria=$4,
           id_proveedor=$5
       WHERE id_producto=$6`,
      [descripcion, precio, stock, id_categoria, id_proveedor, id]
    );

    res.json({ mensaje: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ELIMINAR PRODUCTO
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await db.query(
      "DELETE FROM producto WHERE id_producto=$1",
      [id]
    );

    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;