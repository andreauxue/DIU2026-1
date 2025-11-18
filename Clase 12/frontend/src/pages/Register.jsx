import FormularioAuth from "../components/FormularioAuth";

export default function Register() {
    const handleRegister = async (data) => {
        const res = await fetch("http://127.0.0.1:8005/api/register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const resultado = await res.json();
        console.log(resultado);
    };

    return <FormularioAuth  tipo="register" onSubmit={handleRegister} />;
}

