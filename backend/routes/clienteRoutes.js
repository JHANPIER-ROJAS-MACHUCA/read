const express = require("express");
const router = express.Router();
const db = require("../db");

// LISTAR CLIENTES
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM clientes ORDER BY id_cliente"
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

// REGISTRAR CLIENTE
router.post("/", async (req, res) => {
  try {
    const { nombres, apellidos, direccion, telefono } = req.body;

    await db.query(
      `INSERT INTO clientes (nombres, apellidos, direccion, telefono)
       VALUES ($1, $2, $3, $4)`,
      [nombres, apellidos, direccion, telefono]
    );

    res.json({ mensaje: "Cliente registrado correctamente" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ACTUALIZAR CLIENTE
router.put("/:id", async (req, res) => {
  try {
    const { nombres, apellidos, direccion, telefono } = req.body;
    const id = req.params.id;

    await db.query(
      `UPDATE clientes
       SET nombres=$1, apellidos=$2, direccion=$3, telefono=$4
       WHERE id_cliente=$5`,
      [nombres, apellidos, direccion, telefono, id]
    );

    res.json({ mensaje: "Cliente actualizado correctamente" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ELIMINAR CLIENTE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await db.query(
      "DELETE FROM clientes WHERE id_cliente=$1",
      [id]
    );

    res.json({ mensaje: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;