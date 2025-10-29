export default function TarjetaMascota({ nombre, edad, descripcion, imagen }){
    return(
       <div className="bg-white rounded-lg shadow-lg max-w-xs overflow-hidden hover:shadow-xl transition">
        <img src={imagen} alt={nombre} className="w-full h-48 object-cover"/>
        <h2 className="text-lg font-bold text-pink-600">{nombre}</h2>
        <p className="text-sm">Edad: {edad}</p>
        <p className="text-gray-600 text-sm mt-2">{descripcion}</p>
        <button className="mt-4 bg-pink-300 hover>bg-pink-400 text-white px-4 py-4 rounded">
            Quiero adoptarla
        </button>
       </div> 
    );
}