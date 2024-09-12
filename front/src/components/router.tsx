import { BrowserRouter, Routes, Route } from "react-router-dom";

import Table from "../pages/Table"


export default function Router () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Table/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}