import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import { useAuthStore } from "../../stores/useAuthStore";
import Logout from "../../pages/Logout/Logout";
import NotFound from "../../pages/NotFound/NotFound";

export const App: React.FC = () => {
    const { user } = useAuthStore();

    return (
        <Routes>
            <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
                path="/login"
                element={<Login />}
            />
            <Route path="/logout" element={<Logout />} />
            <Route
                path="*"
                element={<NotFound />}
            />
        </Routes>
    );
}

export default App;
