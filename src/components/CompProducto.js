import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";

function CompProducto() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [idCategoria, setIdCategoria] = useState("");

  const [editando, setEditando] = useState(false);
  const [idProducto, setIdProducto] = useState(null);

  // LISTAR PRODUCTOS
  const listarProductos = async () => {
    const res = await axios.get(`${API_URL}/producto`);
    setProductos(res.data);
  };

  // LISTAR CATEGORÍAS
  const listarCategorias = async () => {
    const res = await axios.get(`${API_URL}/categoria`);
    setCategorias(res.data);
  };

  useEffect(() => {
    listarProductos();
    listarCategorias();
  }, []);

  // AGREGAR PRODUCTO
  const agregarProducto = async () => {
    await axios.post(`${API_URL}/producto`, {
      descripcion,
      precio,
      stock,
      id_categoria: idCategoria
    });

    limpiarFormulario();
    listarProductos();
  };

  // EDITAR PRODUCTO
  const editarProducto = (prod) => {
    setDescripcion(prod.descripcion);
    setPrecio(prod.precio);
    setStock(prod.stock);
    setIdCategoria(prod.id_categoria);
    setIdProducto(prod.id_producto);
    setEditando(true);
  };

  // ACTUALIZAR PRODUCTO
  const actualizarProducto = async () => {
    await axios.put(`${API_URL}/producto/${idProducto}`, {
      descripcion,
      precio,
      stock,
      id_categoria: idCategoria
    });

    limpiarFormulario();
    listarProductos();
  };

  // ELIMINAR PRODUCTO
  const eliminarProducto = async (id) => {
    await axios.delete(`${API_URL}/producto/${id}`);
    listarProductos();
  };

  // LIMPIAR FORMULARIO
  const limpiarFormulario = () => {
    setDescripcion("");
    setPrecio("");
    setStock("");
    setIdCategoria("");
    setEditando(false);
    setIdProducto(null);
  };

  return (
    <div className="card shadow p-4">
      <h2 className="mb-4">CRUD Producto</h2>

      <div className="row mb-3">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={idCategoria}
            onChange={(e) => setIdCategoria(e.target.value)}
          >
            <option value="">Seleccione categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>
                {cat.descripcion}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <button
            className={`btn w-100 ${editando ? "btn-warning" : "btn-primary"}`}
            onClick={editando ? actualizarProducto : agregarProducto}
          >
            {editando ? "Actualizar" : "Agregar"}
          </button>
        </div>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id_producto}>
              <td>{prod.id_producto}</td>
              <td>{prod.descripcion}</td>
              <td>{prod.precio}</td>
              <td>{prod.stock}</td>
              <td>{prod.categoria}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editarProducto(prod)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarProducto(prod.id_producto)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompProducto;