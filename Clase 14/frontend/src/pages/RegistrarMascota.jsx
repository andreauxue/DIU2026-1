// src/pages/RegistrarMascota.jsx

import { useNavigate } from "react-router-dom";
import FormularioMascota from "../components/FormularioMascota";

export function getCSRFCookie() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; csrftoken=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  

export default function RegistrarMascota() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    // Validación de rol desde localStorage
    const rol = localStorage.getItem("rol");

    if (!rol || (rol !== "publicador" && rol !== "admin")) {
      alert("No tienes permisos para registrar mascotas.");
      return;
    }

    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("descripcion", formData.descripcion);
    data.append("edad", formData.edad);
    data.append("vacunado", formData.vacunado);
    data.append("especie_id", formData.especie_id);
    data.append("imagen", formData.imagen);

    const res = await fetch("http://127.0.0.1:8005/api/mascotas/", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": getCSRFCookie(),
        },
        body: data,
      });
      

    const result = await res.json();
    console.log(result);

    if (res.ok) {
      alert("Mascota registrada correctamente");
      navigate("/mascotas");
    } else {
      alert("Error: " + JSON.stringify(result));
    }
  };

  return (
    <div className="mt-8">
      <FormularioMascota onSubmit={handleSubmit} />
    </div>
  );
}
