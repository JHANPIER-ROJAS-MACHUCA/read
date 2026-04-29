import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";

function CompCategoria() {
  const [categorias, setCategorias] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [editando, setEditando] = useState(false);
  const [idCategoria, setIdCategoria] = useState(null);

  const listarCategorias = async () => {
    const res = await axios.get(`${API_URL}/categoria`);
    setCategorias(res.data);
  };

  useEffect(() => {
    listarCategorias();
  }, []);

  const agregarCategoria = async () => {
    await axios.post(`${API_URL}/categoria`, { descripcion });
    limpiarFormulario();
    listarCategorias();
  };

  const editarCategoria = (cat) => {
    setDescripcion(cat.descripcion);
    setIdCategoria(cat.id_categoria);
    setEditando(true);
  };

  const actualizarCategoria = async () => {
    await axios.put(`${API_URL}/categoria/${idCategoria}`, { descripcion });
    limpiarFormulario();
    listarCategorias();
  };

  const eliminarCategoria = async (id) => {
    await axios.delete(`${API_URL}/categoria/${id}`);
    listarCategorias();
  };

  const limpiarFormulario = () => {
    setDescripcion("");
    setEditando(false);
    setIdCategoria(null);
  };

  return (
    <div className="card shadow p-4">
      <h2>CRUD Categoría</h2>

      <input className="form-control mb-3"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <button className={`btn ${editando ? "btn-warning" : "btn-primary"} mb-3`}
        onClick={editando ? actualizarCategoria : agregarCategoria}>
        {editando ? "Actualizar" : "Agregar"}
      </button>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(cat => (
            <tr key={cat.id_categoria}>
              <td>{cat.id_categoria}</td>
              <td>{cat.descripcion}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editarCategoria(cat)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarCategoria(cat.id_categoria)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompCategoria;