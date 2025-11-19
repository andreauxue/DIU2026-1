import { useState } from "react";

export default function FormularioEspecie({ onSubmit }) {
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert("El nombre de la especie es obligatorio");
      return;
    }
    onSubmit({ nombre });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold text-center">Registrar nueva especie</h2>

      <label className="flex flex-col">
        Nombre de la especie:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 rounded"
          placeholder="Ejemplo: Perro, Gato, Ave..."
        />
      </label>

      <button
        type="submit"
        className="p-2 mt-4  bg-pink-600 text-white font-semibold rounded hover:bg-pink-700"
      >
        Registrar especie
      </button>
    </form>
  );
}
