import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate, Outlet } from "react-router-dom"

function PrivateUser() {
    const [state] = useContext(UserContext)
    return (
        <>
            {!localStorage.getItem('token') ? (
            <Navigate to="/"/>
        ): state?.isLogin && state.user?.role === "" ? (
            <Outlet />
        ): (
            <Navigate to='/' />
        )
        }
        {/* {state.isLogin !== false ? <Outlet /> : <Navigate to="/" />} */}
        </>
    )   
}


export default PrivateUser