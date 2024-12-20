import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./routers";
import "./i18n";
import store from "./store";
import "./App.scss";
import Toasts from "@components/Toasts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
            <Toasts />
            <ToastContainer />
        </Provider>
    );
}
