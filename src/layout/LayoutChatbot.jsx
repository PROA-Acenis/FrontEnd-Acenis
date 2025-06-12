import { Outlet } from "react-router-dom";
import ChatBot from '../components/chatBot/ChatbotModal'

function LayoutChatbot(){
    return(
        <>
        <ChatBot />
        <Outlet />  
        </>
    )
}

export default LayoutChatbot;