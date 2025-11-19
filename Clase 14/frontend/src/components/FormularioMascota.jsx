import { useState, useEffect } from "react";

export default function FormularioMascota({ onSubmit }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    edad: "",
    vacunado: false,
    especie_id: "",
    imagen: null,
  });

  const [especies, setEspecies] = useState([]);

  //  Cargar especies desde Django
  useEffect(() => {
    fetch("http://127.0.0.1:8005/api/especies/")
      .then((res) => res.json())
      .then((data) => setEspecies(data))
      .catch((err) => console.error("Error cargando especies:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
        Registrar nueva mascota
      </h2>

      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <input
        type="number"
        name="edad"
        placeholder="Edad"
        value={form.edad}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <div className="flex gap-2 items-center mb-3">
        <input
          type="checkbox"
          name="vacunado"
          checked={form.vacunado}
          onChange={handleChange}
        />
        <label>Vacunado</label>
      </div>

      {/*  SELECT en vez de input número */}
      <select
        name="especie_id"
        value={form.especie_id}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      >
        <option value="">Selecciona una especie</option>
        {especies.map((e) => (
          <option key={e.id} value={e.id}>
            {e.nombre}
          </option>
        ))}
      </select>

      <input
        type="file"
        name="imagen"
        accept="image/*"
        onChange={handleChange}
        className="w-full mb-4"
        required
      />

      <button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded font-semibold"
      >
        Registrar Mascota
      </button>
    </form>
  );
}
