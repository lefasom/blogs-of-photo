import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../pages/Home'
import Collection from "../pages/Collection";
import Layout from "../components/Layout";
import Detail from "../pages/Detail";
import Upload from "../pages/Upload";
import Setting from "../pages/Setting";
import Favorite from "../pages/Favorite";
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/Collection" element={<Collection />}></Route>
            <Route path="/Detail/:id" element={<Detail />}></Route>
            <Route path="/Upload" element={<Upload />}></Route>
            {/* <Route path="/Setting" element={<Setting />}></Route> */}
            <Route path="/Favorite" element={<Favorite />}></Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;