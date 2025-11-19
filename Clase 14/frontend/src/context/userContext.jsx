import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [rol, setRol] = useState(null); 

    useEffect(() => {
        const auth = localStorage.getItem("isAuthenticated") === "true";
        const savedRol = localStorage.getItem("rol");

        setIsAuthenticated(auth);
        setRol(savedRol);
    }, []);

    const loginUser = (rol) => {
        setIsAuthenticated(true);
        setRol(rol);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("rol", rol);
    };

    const logoutUser = () => {
        setIsAuthenticated(false);
        setRol(null);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("rol");
    };

    return (
        <UserContext.Provider value={{ isAuthenticated, rol, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
}
