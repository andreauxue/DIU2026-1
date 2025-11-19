import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        const auth = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(auth);
    }, []);

    const loginUser = () => {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
    };

    const logoutUser = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
    };

    return (
        <UserContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
}