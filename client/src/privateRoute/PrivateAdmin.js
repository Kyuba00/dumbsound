import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate, Outlet } from "react-router-dom"

function PrivateAdmin() {
    const [state] = useContext(UserContext)
    // console.log(state);
    return (
        <>
        {!localStorage.getItem('token') ? (
            <Navigate to="/"/>
        ): state?.isLogin && state.user?.role === "admin" ? (
            <Outlet />
        ): (
            state?.isLogin && state.user?.role === ""  && <Navigate to='/' />
        )
        }
            {/* {state.isLogin !== false && state?.user?.role === "admin" ?  <Outlet/> : <Navigate to="/" />} */}
        </>
    )
}


export default PrivateAdmin