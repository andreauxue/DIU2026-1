export default function AdoptanteInicio() {
    return (
        <div className="p-8 text-center">
            <h1 className="text-4xl font-bold text-pink-400">
                Bienvenido a Adopta una mascota!
            </h1>
            <p className="mt-2"> Podrás explorar todas las masctoas disponibles</p>

            <div>
                <a href="/mascotas"
                className="px-6 py-3 rounded-lg bg-pink-500 text-white font-semibold shadow-md hover:bg-pink-600 transition">
                    Ver mascotas
                </a>
            </div>
        </div>

        

    )
}