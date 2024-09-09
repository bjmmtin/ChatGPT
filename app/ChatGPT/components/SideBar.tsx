import React, { useEffect, useRef } from 'react'
import { useChatLogContext } from '@/app/context/ChatLog'
import ChatAiSvg from './ChatAISvg';
import NavLinks from './NavLink';
interface Props {
    setActiveSidebar: (active: boolean) => void
}

const SideBar: React.FC<Props> = ({ setActiveSidebar }) => {
    const navbarRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        event.stopPropagation
        if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
            setActiveSidebar(false); // Hide navbar
        }
    };
    useEffect(() => {
        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', handleClickOutside);
        };
    })

    const { chatlog } = useChatLogContext();
    return (
        <div className="w-[332px] bg-[#F7F7F7] fixed mt-[70px] rounded-md h-[100vh] z-10 overflow-auto" ref={navbarRef}>
            {chatlog.length > 0 &&
                chatlog.map((chat, idx) => (
                    <NavLinks
                        text={chat.chatPrompt}
                        link={"#chat-" + idx}
                        setChatLog={function (value: React.SetStateAction<string[]>): void {
                            console.log("Function not implemented.");
                        }}
                        key={idx}
                        svg={
                            <ChatAiSvg size={21} />
                        }
                    />
                ))}
        </div>
    );
};

export default SideBar;