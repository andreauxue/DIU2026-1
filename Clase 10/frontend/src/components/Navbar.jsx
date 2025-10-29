export default function Navbar () {
    return (
        <nav className="bg-pink-500 text-white px-6 py-3 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-semibold">Adopta una Mascota</h1>
            <ul className="flex gap-6">
                <li><a href="/" className="hover:underline">Inicio</a></li>
                <li><a href="/login" className="hover:underline">Login</a></li>
                <li><a href="/register" className="hover:underline">Registro</a></li>
            </ul>
        </nav>
    )
}

