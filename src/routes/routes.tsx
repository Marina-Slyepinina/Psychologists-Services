import { LogInModal } from "../components/LogInModal/LogInModal";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import { RegistrationModal } from "../components/RegistrationModal/RegistrationModal";
import { Favorites } from "../pages/Favorites";
import { Home } from "../pages/Home";
import { Psychologists } from "../pages/Psychologists";

export const routesList = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "psychologists",
        element: <Psychologists />
    },
    {
        path: "favorites",
        element: (
            <ProtectedRoute>
                <Favorites />
            </ProtectedRoute>
        )
    },
    {
        path: "login",
        element: <LogInModal />
    },
    {
        path: "registration",
        element: <RegistrationModal />
    }
];