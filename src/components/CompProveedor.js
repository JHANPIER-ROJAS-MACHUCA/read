import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";

function CompProveedor() {
  const [proveedores, setProveedores] = useState([]);
  const [razonsocial, setRazonSocial] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [editando, setEditando] = useState(false);
  const [idProveedor, setIdProveedor] = useState(null);

  const listarProveedores = async () => {
    const res = await axios.get(`${API_URL}/proveedor`);
    setProveedores(res.data);
  };

  useEffect(() => {
    listarProveedores();
  }, []);

  const agregarProveedor = async () => {
    await axios.post(`${API_URL}/proveedor`, { razonsocial, direccion, telefono });
    limpiarFormulario();
    listarProveedores();
  };

  const editarProveedor = (prov) => {
    setRazonSocial(prov.razonsocial);
    setDireccion(prov.direccion);
    setTelefono(prov.telefono);
    setIdProveedor(prov.id_proveedor);
    setEditando(true);
  };

  const actualizarProveedor = async () => {
    await axios.put(`${API_URL}/proveedor/${idProveedor}`, { razonsocial, direccion, telefono });
    limpiarFormulario();
    listarProveedores();
  };

  const eliminarProveedor = async (id) => {
    await axios.delete(`${API_URL}/proveedor/${id}`);
    listarProveedores();
  };

  const limpiarFormulario = () => {
    setRazonSocial(""); setDireccion(""); setTelefono("");
    setEditando(false); setIdProveedor(null);
  };

  return (
    <div className="card shadow p-4">
      <h2>CRUD Proveedor</h2>

      <input className="form-control mb-2" placeholder="Razón Social" value={razonsocial} onChange={(e) => setRazonSocial(e.target.value)} />
      <input className="form-control mb-2" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
      <input className="form-control mb-3" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />

      <button className={`btn ${editando ? "btn-warning" : "btn-primary"} mb-3`}
        onClick={editando ? actualizarProveedor : agregarProveedor}>
        {editando ? "Actualizar" : "Agregar"}
      </button>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Razón Social</th><th>Dirección</th><th>Teléfono</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map(prov => (
            <tr key={prov.id_proveedor}>
              <td>{prov.id_proveedor}</td>
              <td>{prov.razonsocial}</td>
              <td>{prov.direccion}</td>
              <td>{prov.telefono}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editarProveedor(prov)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarProveedor(prov.id_proveedor)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompProveedor;