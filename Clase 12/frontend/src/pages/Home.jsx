import Boton from "../components/Boton";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col item-center justify-center min-h-screen bg-pink-50 text-center px-6">
            <h2 className="text-3xl font-bold text-pink-600 mb-4">
                Bienvenido a Adopta una Mascota!
            </h2>
            <p className="text-gray-700 mb-8 max-w-lg">
                En este sitio encontrarás a tu mejor amigo.
                Tu mejor amigo peludo te espera, compañía de un animalito hecho a la medida para ti...
            </p>
            <div className="flex gap-4">
                <Boton texto="Ver mascotas" onClick={() => navigate("/mascotas")}/>
                <Boton texto="Registrarme" color="bg-pink-400" onClick={() => navigate("/register")}/>
            </div>
        </div>
    );
}