const express = require("express");
const router = express.Router();
const db = require("../db");

// LISTAR PROVEEDORES
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM proveedor ORDER BY id_proveedor"
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

// REGISTRAR PROVEEDOR
router.post("/", async (req, res) => {
  try {
    const { razonsocial, direccion, telefono } = req.body;

    await db.query(
      `INSERT INTO proveedor (razonsocial, direccion, telefono)
       VALUES ($1, $2, $3)`,
      [razonsocial, direccion, telefono]
    );

    res.json({ mensaje: "Proveedor registrado correctamente" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ACTUALIZAR PROVEEDOR
router.put("/:id", async (req, res) => {
  try {
    const { razonsocial, direccion, telefono } = req.body;
    const id = req.params.id;

    await db.query(
      `UPDATE proveedor
       SET razonsocial=$1, direccion=$2, telefono=$3
       WHERE id_proveedor=$4`,
      [razonsocial, direccion, telefono, id]
    );

    res.json({ mensaje: "Proveedor actualizado correctamente" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ELIMINAR PROVEEDOR
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await db.query(
      "DELETE FROM proveedor WHERE id_proveedor=$1",
      [id]
    );

    res.json({ mensaje: "Proveedor eliminado correctamente" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;