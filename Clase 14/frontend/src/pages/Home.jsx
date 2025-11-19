import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Boton from "../components/Boton";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(UserContext);
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const r = localStorage.getItem("rol");
    setRol(r);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-center px-6">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">
            Bienvenido a Adopta una Mascota!
        </h2>

        <p className="text-gray-700 mb-8 max-w-lg">
          Conoce a tu futuro amigo peludo. Regístrate para adoptar 
          o inicia sesión si ya tienes cuenta.
        </p>

        <div className="flex gap-4">
          <Boton texto="Ver mascotas" onClick={() => navigate("/mascotas")} />
          <Boton texto="Registrarme" color="bg-pink-400" onClick={() => navigate("/register")} />
        </div>
      </div>
    );
  }

  if (rol === "publicador") {
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold text-pink-600">Panel de Publicador</h1>
        <p className="text-gray-700 mt-3">Puedes registrar nuevos animalitos para adopción.</p>

        <div className="mt-6 flex justify-center gap-4">
          <Boton texto="Ver mascotas" onClick={() => navigate("/mascotas")} />
          <Boton texto="Registrar mascota" color="bg-pink-500" onClick={() => navigate("/registrar-mascota")} />
        </div>
      </div>
    );
  }

  if (rol === "adoptante") {
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold text-pink-600">Bienvenido</h1>
        <p className="text-gray-700 mt-3">Encuentra a la mascota perfecta para ti.</p>

        <div className="mt-6 flex justify-center">
          <Boton texto="Ver mascotas" onClick={() => navigate("/mascotas")} />
        </div>
      </div>
    );
  }

  if (rol === "admin") {
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold text-pink-600">Panel de Administración</h1>
        <p className="text-gray-700 mt-3">Controla usuarios, mascotas y permisos.</p>

        <div className="mt-6 flex justify-center gap-4">
          <Boton texto="Ver mascotas" onClick={() => navigate("/mascotas")} />
          <Boton texto="Registrar mascotas" color="bg-pink-500" onClick={() => navigate("/registrar-mascota")} />
        </div>
      </div>
    );
  }

  return <p>Cargando...</p>;
}
