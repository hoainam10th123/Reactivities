//import { Navigate } from "react-router-dom";
import { useStore } from "../stores/store";
import NotLoginPage from "./NotLoginPage";


export default function PrivateWrapper({ children }: { children: JSX.Element }) {
    const { userStore: { isLoggedIn } } = useStore();
    return isLoggedIn ? children : <NotLoginPage />;
    //return isLoggedIn ? children : <Navigate to="/" replace />;
};