import ListaMascotas from "../components/ListaMascotas";

export default function Home() {
    return (
        <div className="min-h-screen bg-pink-100 p-6">
            <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
                Adopta un animalito
            </h1>
            <ListaMascotas/>
        </div>
    )
}
