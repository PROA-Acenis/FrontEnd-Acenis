import { Outlet } from "react-router-dom";
import ChatBot from '../components/chatBot/ChatbotModal'
import Footer from '../components/footer/Footer'

function LayoutChatbot(){
    return(
        <>
        <ChatBot />
        <Outlet />  
        <Footer />
        </>
    )
}

export default LayoutChatbot;