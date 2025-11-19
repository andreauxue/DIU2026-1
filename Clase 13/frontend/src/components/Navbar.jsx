import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { isAuthenticated, logoutUser } = useContext (UserContext);
  
  const handleLogout = async () => {
    const getCookie =  (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const csrfToken = getCookie("csrftoken");

    const res = await fetch("http://127.0.0.1:8005/api/logout/", {
        method: "POST",
        headers: {"X-CSRFToken": csrfToken},
        credentials: "include",
    });

    logoutUser();
  };

  return (
    <nav className="bg-pink-500 text-white">
      <h1> Adopta un animalito</h1>
      <ul>
        <li><a href="/">Inicio</a></li>
      

      {isAuthenticated ? (
        <>
        <li><a href="/mascotas">Mascotas</a></li>
        <li>
          <button
          onClick={handleLogout}>
            Logout
          </button>
        </li>
        </>
      ) : (
        <>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
        </>
      )}
      </ul>
    </nav>

  );
}