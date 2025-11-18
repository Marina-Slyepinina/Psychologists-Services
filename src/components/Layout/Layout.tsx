import { useLocation, useOutlet } from "react-router";
import { Header } from "../Header/Header";
import { Home } from "../../pages/Home";
import { Psychologists } from "../../pages/Psychologists";
import { Favorites } from "../../pages/Favorites";

const getComponentByPath = (path: string) => {
    switch (path) {
        case '/': return <Home />;
        case '/psychologists': return <Psychologists />;
        case '/favorites': return <Favorites />;
        default: return <Home />; 
    }
};

export const Layout = () => {
    const location = useLocation();
    const backgroundLocation = location.state?.backgroundLocation;

    const outlet = useOutlet(); 

    let mainContent;
    let modalContent = null;

    if (backgroundLocation) {

        mainContent = getComponentByPath(backgroundLocation.pathname);
        modalContent = outlet;

    } else {
        mainContent = outlet;
    }

    return (
        <>
            <Header />
            <main> 
                {mainContent}
            </main>

            {modalContent}
        </> 
    );
};