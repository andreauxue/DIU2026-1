import {useState} from "react";

export default function FormularioAuth({ tipo, onSubmit }) {
    const [formData, setFormData] = useState({ username: "", password: "", email: "" });

    const handleChange = (e) => 
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e)  => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 w-full max-w-sm mx-auto"
        >
            <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
                {tipo === "login" ? "Inicia sesión" : "Crea una cuenta"}
            </h2>

            <input 
                name="username"
                placeholder="Usuario"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 mb-3 border rounded"
            />

            {tipo === "register" && (
                <input 
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded"
                />
            )}

            <input 
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 mb-3 border rounded"
            />

            <button
                type="submit"
                className="bg-pink-400 hover:bg-pink-500 text-white font-seminbold py-2 px-4 rounded w-full"
            >
                {tipo === "login" ? "Entrar" : "Registrarse"}
            </button>
        </form>
    )
}