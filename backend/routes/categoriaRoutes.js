const express = require("express");
const router = express.Router();
const db = require("../db");

// LISTAR CATEGORIAS
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM categoria ORDER BY id_categoria"
    );

    res.json(result.rows); // SOLO filas
  } catch (error) {
    res.status(500).json(error);
  }
});

// INSERTAR CATEGORIA
router.post("/", async (req, res) => {
  try {
    const { descripcion } = req.body;

    await db.query(
      "INSERT INTO categoria (descripcion) VALUES ($1)",
      [descripcion]
    );

    res.json({ mensaje: "Categoría registrada correctamente" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ACTUALIZAR CATEGORIA
router.put("/:id", async (req, res) => {
  try {
    const { descripcion } = req.body;
    const id = req.params.id;

    await db.query(
      "UPDATE categoria SET descripcion=$1 WHERE id_categoria=$2",
      [descripcion, id]
    );

    res.json({ mensaje: "Categoría actualizada correctamente" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ELIMINAR CATEGORIA
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await db.query(
      "DELETE FROM categoria WHERE id_categoria=$1",
      [id]
    );

    res.json({ mensaje: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;