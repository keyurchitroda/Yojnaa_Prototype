import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./styles/style.css";
import Layout from "./components/Layout/Layout";
import Login from "./components/Auth/Login";
import Resgitser from "./components/Auth/Resgitser";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const token = localStorage.getItem("token");
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<Layout />}></Route>
        {/* <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Resgitser />}></Route> */}
      </Route>
    )
  );

  const router1 = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* <Route index element={<Layout />}></Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Resgitser />}></Route>
      </Route>
    )
  );

  return (
    <>
      <div className="font-bodyFont">
        <ToastContainer />

        <RouterProvider router={token ? router : router1} />
      </div>
    </>
  );
}

export default App;
