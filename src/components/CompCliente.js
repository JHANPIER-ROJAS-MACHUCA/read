import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";

function CompCliente() {
  const [clientes, setClientes] = useState([]);
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [editando, setEditando] = useState(false);
  const [idCliente, setIdCliente] = useState(null);

  const listarClientes = async () => {
    const res = await axios.get(`${API_URL}/cliente`);
    setClientes(res.data);
  };

  useEffect(() => {
    listarClientes();
  }, []);

  const agregarCliente = async () => {
    await axios.post(`${API_URL}/cliente`, { nombres, apellidos, direccion, telefono });
    limpiarFormulario();
    listarClientes();
  };

  const editarCliente = (cli) => {
    setNombres(cli.nombres);
    setApellidos(cli.apellidos);
    setDireccion(cli.direccion);
    setTelefono(cli.telefono);
    setIdCliente(cli.id_cliente);
    setEditando(true);
  };

  const actualizarCliente = async () => {
    await axios.put(`${API_URL}/cliente/${idCliente}`, { nombres, apellidos, direccion, telefono });
    limpiarFormulario();
    listarClientes();
  };

  const eliminarCliente = async (id) => {
    await axios.delete(`${API_URL}/cliente/${id}`);
    listarClientes();
  };

  const limpiarFormulario = () => {
    setNombres(""); setApellidos(""); setDireccion(""); setTelefono("");
    setEditando(false); setIdCliente(null);
  };

  return (
    <div className="card shadow p-4">
      <h2>CRUD Cliente</h2>

      <input className="form-control mb-2" placeholder="Nombres" value={nombres} onChange={(e) => setNombres(e.target.value)} />
      <input className="form-control mb-2" placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
      <input className="form-control mb-2" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
      <input className="form-control mb-3" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />

      <button className={`btn ${editando ? "btn-warning" : "btn-primary"} mb-3`}
        onClick={editando ? actualizarCliente : agregarCliente}>
        {editando ? "Actualizar" : "Agregar"}
      </button>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Nombres</th><th>Apellidos</th><th>Dirección</th><th>Teléfono</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cli => (
            <tr key={cli.id_cliente}>
              <td>{cli.id_cliente}</td>
              <td>{cli.nombres}</td>
              <td>{cli.apellidos}</td>
              <td>{cli.direccion}</td>
              <td>{cli.telefono}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editarCliente(cli)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarCliente(cli.id_cliente)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompCliente;