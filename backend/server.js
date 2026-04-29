const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000"
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  }
}));

app.use(express.json());

app.use("/categoria", require("./routes/categoriaRoutes"));
app.use("/producto", require("./routes/productoRoutes"));
app.use("/cliente", require("./routes/clienteRoutes"));
app.use("/proveedor", require("./routes/proveedorRoutes"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend en puerto ${PORT}`);
});
