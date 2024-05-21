import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

function PrivateRoute() {
    const member = useSelector((state) => state.member.value);
    return member.isAuthorized ? (
        <>
            <div>
                <Header />
            </div>
            <div>
                <Outlet />
            </div>
        </>
    ) : (
        // <Navigate to="" />
        <></>
    );
}

export default PrivateRoute;
