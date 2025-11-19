import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isAuthenticated, rol, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const csrfToken = getCookie("csrftoken");

    await fetch("http://127.0.0.1:8005/api/logout/", {
      method: "POST",
      headers: { "X-CSRFToken": csrfToken },
      credentials: "include",
    });

    logoutUser();     
    navigate("/login"); 
  };

  return (
    <nav className="bg-pink-500 text-white px-6 py-3 shadow-md">
      <div className="flex justify-between items-center max-w-5xl mx-auto">

        <h1 className="text-xl font-bold"> Adopta un Animalito</h1>

        <ul className="flex gap-4 items-center">

          <li><a href="/" className="hover:underline">Inicio</a></li>

          {isAuthenticated && rol === "admin" && (
            <>
              <li><a href="/admin" className="hover:underline">Panel Admin</a></li>
              <li><a href="/registrar-especie" className="hover:underline">Especies</a></li>
            </>
          )}

          {isAuthenticated && rol === "publicador" && (
            <>
              <li><a href="/mascotas" className="hover:underline">Mascotas</a></li>
              <li><a href="/registrar-mascota" className="text-white">Registrar Mascota</a></li>
            </>
          )}

          {isAuthenticated && rol === "adoptante" && (
            <>
              <li><a href="/mascotas" className="hover:underline">Ver Mascotas</a></li>
            </>
          )}

          {!isAuthenticated && (
            <>
              <li><a href="/login" className="hover:underline">Login</a></li>
              <li><a href="/register" className="hover:underline">Registro</a></li>
            </>
          )}

          {isAuthenticated && (
            <li>
              <button
                onClick={handleLogout}
                className="bg-pink-700 px-3 py-1 rounded hover:bg-pink-800 transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
