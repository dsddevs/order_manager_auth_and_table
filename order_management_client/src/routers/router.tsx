import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "../pages/homePage.tsx";
import {PrivateRoute} from "./privateRouter.tsx";
import {AuthPage} from "../pages/authPage.tsx";

export const Routers = () => {

    return (
        <BrowserRouter>
            <Routes>
                    <Route path="/" element={<AuthPage/>}/>
                    <Route
                        path="/home"
                        element={
                            <PrivateRoute>
                                <HomePage/>
                            </PrivateRoute>
                        }
                    />

            </Routes>
        </BrowserRouter>
    );
}