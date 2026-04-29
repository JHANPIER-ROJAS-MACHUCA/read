const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); // permite todo
app.use(express.json());

app.use("/categoria", require("./routes/categoriaRoutes"));
app.use("/producto", require("./routes/productoRoutes"));
app.use("/cliente", require("./routes/clienteRoutes"));
app.use("/proveedor", require("./routes/proveedorRoutes"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend en puerto ${PORT}`);
});