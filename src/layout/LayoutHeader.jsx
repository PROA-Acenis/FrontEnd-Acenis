import { Outlet } from "react-router-dom";
import Header from '../components/header/Header'

function LayoutHeader(){
    return(
        <>
        <Header />
        <Outlet />  
        </>
    )
}

export default LayoutHeader;