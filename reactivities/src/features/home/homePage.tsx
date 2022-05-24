import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/loginForm";
import RegisterForm from "../users/registerForm";

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();

    return (
        <div className="masthead justify-content-center">
            <div className="text-center">
                <img src="/assets/logo.png" alt="" /> <h1 className="white">Reactvities</h1>
                {userStore.isLoggedIn ? (<>
                    <h2 className="white">Wellcome to reactivities</h2>
                    <Link to="/activities">
                        <Button variant="success">Activities</Button>
                    </Link>
                </>) : (
                    <>
                     <Button variant="success" onClick={() => modalStore.openModal("Login", <LoginForm />)}>Login</Button>
                     <Button variant="primary" onClick={() => modalStore.openModal("Register", <RegisterForm />)}>Register</Button>
                    </>                                       
                )}
            </div>
        </div>
    );
})