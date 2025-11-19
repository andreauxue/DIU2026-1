import { useNavigate } from "react-router-dom";

export default function AdminInicio() {
    const navigate = useNavigate();

    return (
        <div className="p-8 text-center">
            <h1 className="text-4xl font-bold text-pink-700 mb-4">
                Panel de Administración
            </h1>

            <p className="text-gray-700 mb-10">  
                Desde aquí puedes gestionar la lista de mascotas y administrar las especies disponibles.
            </p>

            <div className="flex justify-center gap-6">
                <button
                onClick={() => navigate("/registrar-mascota")}
                className="px-6 py-3 rounded-lg bg-pink-500 text-white font-semibold shadow-md hover:bg-pink-600 transition"
                >
                    Registrar Mascota
                </button>
                <button
                onClick={() => navigate("/registrar-especie")}
                className="px-6 py-3 rounded-lg bg-pink-500 text-white font-semibold shadow-md hover:bg-pink-600 transition"
                >
                    Registrar Especie
                </button>
            </div>
        </div>
    );
}