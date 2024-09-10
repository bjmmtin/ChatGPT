import React, { useEffect, useRef } from 'react'
import { useChatLogContext } from '@/app/context/ChatLog'
import ChatAiSvg from './ChatAISvg';
import NavLinks from './NavLink';

const SideBar = () => {

    const ModalOverlay = () => (
        <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 z-20`}
            onClick={() => {
                setActiveSidebar(prev => !prev);
            }}
        />
    )
    const { chathistory, setCurrentHistory, activeSidebar, setActiveSidebar } = useChatLogContext();
    return (
        <>
            {activeSidebar &&
                <div className="w-[332px] bg-[#F7F7F7] md:relative fixed rounded-md h-[calc(100vh-112px)] z-30 overflow-auto" >
                    {chathistory.length > 0 &&
                        chathistory.map((history, idx) => (
                            <NavLinks
                                text={history.name}
                                link={"#chat-" + idx}
                                setChatHistory={() => setCurrentHistory(history)}
                                key={idx}
                                svg={
                                    <ChatAiSvg size={21} />
                                }
                            />
                        ))}
                </div>}
            {activeSidebar ? <ModalOverlay/>:<></>}
        </>
    );
};

export default SideBar;


