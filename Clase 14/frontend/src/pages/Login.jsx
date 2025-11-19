import FormularioAuth from "../components/FormularioAuth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext); 

  const handleLogin = async (data) => {
    const res = await fetch("http://127.0.0.1:8005/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log("Respuesta del login:", result);

    if (result.user) {

      localStorage.setItem("rol", result.user.rol);

      loginUser(result.user.rol);  


      if (result.user.rol === "admin") {
        navigate("/admin");
      } else if (result.user.rol === "publicador") {
        navigate("/publicador");
      } else {
        navigate("/adoptante");
      }

    } else {
      alert("Credenciales inválidas");
    }
  };

  return <FormularioAuth tipo="login" onSubmit={handleLogin} />;
}
