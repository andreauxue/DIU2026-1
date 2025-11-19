import { useNavigate } from "react-router-dom";
import FormularioEspecie from "../components/FormularioEspecie";

export function getCSRFCookie() {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; csrftoken=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function RegistrarEspecie() {
  const navigate = useNavigate();

  const handleSubmit = async ({ nombre }) => {
    const rol = localStorage.getItem("rol");

    // Validar que solo admin pueda crear especies
    if (rol !== "admin") {
      alert("Solo un administrador puede registrar nuevas especies.");
      return;
    }

    const csrfToken = getCSRFCookie();

    if (!csrfToken) {
      alert("No se encontró el token CSRF.");
      return;
    }

    const res = await fetch("http://127.0.0.1:8005/api/especies/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({ nombre }),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      alert("Especie registrada correctamente");
      navigate("/especies");
    } else {
      alert("Error: " + JSON.stringify(data));
    }
  };

  return (
    <div className="p-4">
      <FormularioEspecie onSubmit={handleSubmit} />
    </div>
  );
}
