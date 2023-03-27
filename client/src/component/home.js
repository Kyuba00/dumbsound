import { useContext, useEffect } from "react";
import Content from "./content";
import Header from "./header";
import './style.css'
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Home (){
    const navigate = useNavigate()
    const [state] = useContext(UserContext)

    useEffect(() => {
        if (state?.isLogin !== false) {
            if (state.user?.listAs === "admin") {
                navigate('/list-transaction')
            }else{
                navigate('/')
            }

        }
    }, [state])
    return(
        <>
            <Header/>
            <Content />
        </>
    )
}

export default Home