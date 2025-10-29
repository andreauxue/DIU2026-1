import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListaMascotas from "./components/ListaMascotas";
import { UserProvider } from "./context/UserContext";

export default function App() {
  useEffect(() => {
    fetch("http://127.0.0.1:8005/api/login/", 
        {
            method: "GET",
            credentials: "include",
        });
  }, []);

  return (
    <UserProvider>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar/>
        <main className="flex-grow bg-pink-50 p-6">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route path="/mascotas" element={<ListaMascotas/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
    </UserProvider>
  )
}