import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
const Header = () => {
    const [inputTitle, setInputTitle] = useState("Untitled chat");
    return (
        <div className="sticky z-10 min-h-[48px] w-full ">
            <header className="absolute left-0 right-0 bg-[#fcfbfb] flex flex-row items-center justify-between px-1 sm:px-2 md:px-3 border-b min-h-[48px] h-fit gap-1 sm:gap-2">
                <div className="flex gap-1 items-center">
                    <a href="/home">
                        <div className="cursor-pointer"><Image alt="Logo" fetchPriority="high" width="64" height="36" decoding="async" data-nimg="1" src="/dark_logo.svg" />
                        </div>
                    </a>
                    <span className=" ml-2">/</span>
                    <button className="items-center justify-center font-medium hover:bg-[#909e9e1a]  rounded-md text-body flex gap-x-1 sm:gap-x-2 text-xs sm:text-sm md:text-sm p-1.5 md:px-2 md:py-1.5 h-fit truncate min-w-0 flex-shrink" >
                        No company profile
                        <span className="inline-flex items-center justify-center h-3 w-3 ">
                            <div className="w-full h-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-black" viewBox="0 0 512 512"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 184l144 144 144-144" className="fill-none">
                                </path>
                                </svg>
                            </div>
                        </span>
                    </button>
                    <span className="mr-2">/</span>
                    <div className="title-input-wrapper relative font-medium  text-xs sm:text-sm md:text-sm">
                        <span className="px-2 opacity-0">{inputTitle}</span>
                        <input className="absolute bg-[#f8f7f7] z-10 pl-2 cursor-text rounded-md -top-2 h-[35px] w-full left-0 focus-visible:ring-2  focus-visible:border hover:bg-[#909e9e1a] outline-none focus-visible:ring-blue-500 focus-visible:border-[#3b82f6]" value={inputTitle}
                            onChange={(e) => setInputTitle(e.target.value)} />
                    </div>
                </div>
                <div className="flex gap-1 sm:gap-2 md:gap-3 items-center">
                    <button className="tems-center justify-center font-medium border hover:bg-[#909e9e1a] rounded-md text-body flex gap-x-1 sm:gap-x-2 text-xs sm:text-sm md:text-sm p-1.5 md:px-2 md:py-2 h-fit truncate min-w-0 flex-shrink transition-all" >
                        <span className="inline-flex items-center justify-center h-3 w-3.5 ">
                            <div className="w-full h-full pt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-black" viewBox="0 0 512 512">
                                    <path strokeWidth={32} d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" strokeMiterlimit="10" className="fill-none">
                                    </path>
                                    <path strokeWidth={32} strokeLinecap="round" strokeMiterlimit="10" d="M338.29 338.29L448 448" ></path>
                                </svg>
                            </div>
                        </span>
                        <span className="truncate">Chat history</span>
                    </button>
                    <a href="/home">
                        <button className=" items-center justify-center font-medium border text-white bg-[#0083da]  hover:bg-[#02599B] rounded-md flex gap-x-1 sm:gap-x-2 text-xs sm:text-sm md:text-sm p-1.5 md:px-2 md:py-2 h-fit flex-shrink min-w-0 max-w-fit">
                            <span className="inline-flex items-center justify-center w-3">
                                <div className="icon-inner w-full h-full"><svg xmlns="http://www.w3.org/2000/svg" className="stroke-white" viewBox="0 0 512 512"><path strokeLinecap="round" strokeWidth={32} strokeLinejoin="round" d="M256 112v288M400 256H112" className=""></path></svg></div>
                            </span>
                            <span className="truncate min-w-0 flex-shrink hidden sm:inline" >New chat</span>
                        </button>
                    </a>
                    <button className="whitespace-nowrap items-center font-medium hover:bg-[#909e9e1a]  text-body sm:!h-[35px] h-fit rounded-md flex gap-x-1 sm:gap-x-1 text-xs sm:text-sm md:text-sm p-1.5 md:py-1.5 md:px-1 justify-center">
                        <span className="inline-flex items-center justify-center w-3">
                            <div className="w-full h-full"><svg xmlns="http://www.w3.org/2000/svg" className="stroke-black" viewBox="0 0 512 512"><circle cx="256" cy="256" r="48"></circle><circle cx="256" cy="416" r="48"></circle><circle cx="256" cy="96" r="48"></circle></svg></div>
                        </span>
                    </button>
                    <button className=" items-center justify-center font-medium  border hover:bg-[#909e9e1a] rounded-md text-body flex gap-x-1 sm:gap-x-2 text-xs sm:text-sm md:text-sm p-1.5 md:px-2 md:py-2 h-fit flex-shrink min-w-0 max-w-fit" type="button">Prompt library
                        <span className="inline-flex items-center justify-center w-3.5">
                            <div className="w-full h-full"><svg xmlns="http://www.w3.org/2000/svg" className="stroke-black" viewBox="0 0 512 512"><path strokeLinecap="round" strokeMiterlimit="10" d="M80 160h352M80 256h352M80 352h352" strokeWidth={32} className=""></path></svg></div>
                        </span>
                    </button>
                </div>
            </header>
        </div>
    )
}

export default Header;