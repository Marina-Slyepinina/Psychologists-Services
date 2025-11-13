import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "../components/Layout/Layout";
import { routesList } from "./routes";

const rourer = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: routesList
    }
]);


export const AppRouter = () => {
    return <RouterProvider router={rourer}/>
}