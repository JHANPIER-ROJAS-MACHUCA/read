import { useState } from "react";
import CompCategoria from "./components/CompCategoria";
import CompProducto from "./components/CompProducto";
import CompCliente from "./components/CompCliente";
import CompProveedor from "./components/CompProveedor";

function App() {
  const [opcion, setOpcion] = useState("");

  const renderComponente = () => {
    switch (opcion) {
      case "categoria":
        return <CompCategoria />;
      case "producto":
        return <CompProducto />;
      case "cliente":
        return <CompCliente />;
      case "proveedor":
        return <CompProveedor />;
      default:
        return (
          <div className="text-center mt-5">
            <h3>Seleccione una opción del menú</h3>
          </div>
        );
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand">Sistema CRUD</span>

        <div>
          <button className="btn btn-outline-light me-2" onClick={() => setOpcion("categoria")}>
            Categorías
          </button>
          <button className="btn btn-outline-light me-2" onClick={() => setOpcion("producto")}>
            Productos
          </button>
          <button className="btn btn-outline-light me-2" onClick={() => setOpcion("cliente")}>
            Clientes
          </button>
          <button className="btn btn-outline-light" onClick={() => setOpcion("proveedor")}>
            Proveedores
          </button>
        </div>
      </nav>

      <div className="container mt-4">
        {renderComponente()}
      </div>
    </div>
  );
}

export default App;