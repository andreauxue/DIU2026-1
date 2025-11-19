export default function Boton ({ texto, onClick, color ="bg-pink-500"}) {
    return (
        <button
            onClick={onClick}
            className={`${color} text-white px-4 py-2 rounded-md hover:opacity-90 transition`}
        >
            {texto}
        </button>
    );
}

