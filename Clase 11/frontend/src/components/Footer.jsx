export default function Footer ({ color = "bg-gray-100", texto = "Adopta una Mascota"}) {
    return (
        <footer className={`${color} text-center text-gray-600 py-4 mt-10 border-t`}>
            <p className="text-sm">{texto}</p>
        </footer>
    );
}

