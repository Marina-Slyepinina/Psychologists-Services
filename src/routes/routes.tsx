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
        element: <Favorites />
    }
];