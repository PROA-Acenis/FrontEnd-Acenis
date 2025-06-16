import HeaderPublica from '../components/header/HeaderPublica'
import { Outlet } from 'react-router-dom'

function LayoutHeaderPublica(){
    return(
        <>
            <HeaderPublica />
            <Outlet />
        </>
    )
}

export default LayoutHeaderPublica