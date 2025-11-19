import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import FormularioAuth from "../components/FormularioAuth";
import { UserContext } from "../context/UserContext";

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
};

export default function Login() {
    const navigate = useNavigate();
    const { loginUser } = useContext(UserContext);

    const handleLogin = async (data) => {
        try {
            await fetch("http://127.0.0.1:8005/api/login/", {
            method: "GET",
            credentials: "include",
        });

        const csrfToken = getCookie("csrftoken");

        const res = await fetch("http://127.0.0.1:8005/api/login/", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            credentials: "include",
            body: JSON.stringify(data), 
        });
         
        const resultado = await res.json();

        if (!res.ok) {
            alert(resultado.error || "Error al iniciar sesión"); 
        } else {
            alert(` ${resultado.message}`);
            loginUser();
            navigate("/mascotas");
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error al conectar con el servidor.");
    }
    };

    return <FormularioAuth tipo="login" onSubmit={handleLogin}/>;
}