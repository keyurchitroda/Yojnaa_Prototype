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
import { ToastContainer } from "react-toastify";
import CardDetails from "./components/CardDetails/CardDetails";
import BoothList from "./components/BoothList/BoothList";
import SchemeList from "./components/SchemeList/SchemeList";
import YojnaForm from "./components/YojnaForm/YojnaForm";
import { YojnaFormEdit } from "./components/YojnaForm/YojnaFormEdit";

function App() {
  const token = localStorage.getItem("token");
  console.log("app-=-=-=-=-", window.location.href);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<Layout />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Resgitser />}></Route>
        <Route path="/details" element={<CardDetails />}></Route>
        <Route path="/boothlist" element={<BoothList />}></Route>
        <Route path="/schemelist" element={<SchemeList />}></Route>
        <Route path="/yojnaformlist" element={<YojnaForm />}></Route>
        <Route path="/yojnaform" element={<YojnaFormEdit />}></Route>
      </Route>
    )
  );

  return (
    <>
      <div className="font-bodyFont">
        <ToastContainer />

        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
