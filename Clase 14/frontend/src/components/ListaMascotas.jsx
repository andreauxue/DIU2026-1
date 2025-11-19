import { useState, useEffect } from "react";
import TarjetaMascota from "./TarjetaMascota";

export default function ListaMascotas() {
  const [mascotas, setMascotas] = useState([]);  // estado para guardar datos
  const [loading, setLoading] = useState(true);  // estado para saber si está cargando
  const [error, setError] = useState(null);      // estado para errores

  useEffect(() => {
    fetch("http://127.0.0.1:8005/api/mascotas/")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener mascotas");
        return res.json();
      })
      .then((data) => {
        setMascotas(data);   // guardamos las mascotas en estado
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // se ejecuta solo una vez al montar

  if (loading) return <p className="text-center">Cargando mascotas...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
      {mascotas.map((m) => (
        <TarjetaMascota
          key={m.id}
          nombre={m.nombre}
          edad={m.edad}
          descripcion={m.descripcion}
          imagen={m.imagen}
        />
      ))}
    </div>
  );
}
