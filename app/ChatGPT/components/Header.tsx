import Image from "next/image";
import { useState } from "react";

const Header = () => {
  const [inputTitle, setInputTitle] = useState("Untitled chat");
  return (
    <div className="sticky z-10 min-h-[48px] w-full ">
      <header className="absolute left-0 right-0 flex h-fit min-h-[48px] flex-row items-center justify-between gap-1 border-b bg-[#fcfbfb] px-1 sm:gap-2 sm:px-2 md:px-3">
        <div className="flex items-center gap-1">
          <a href="/home">
            <div className="cursor-pointer">
              <Image
                alt="Logo"
                fetchPriority="high"
                width="64"
                height="36"
                decoding="async"
                data-nimg="1"
                src="/dark_logo.svg"
              />
            </div>
          </a>
          <span className=" ml-2">/</span>
          <button className="text-body flex h-fit min-w-0  flex-shrink items-center justify-center gap-x-1 truncate rounded-md p-1.5 text-xs font-medium hover:bg-[#909e9e1a] sm:gap-x-2 sm:text-sm md:px-2 md:py-1.5 md:text-sm">
            No company profile
            <span className="inline-flex h-3 w-3 items-center justify-center ">
              <div className="h-full w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-black"
                  viewBox="0 0 512 512"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="48"
                    d="M112 184l144 144 144-144"
                    className="fill-none"
                  ></path>
                </svg>
              </div>
            </span>
          </button>
          <span className="mr-2">/</span>
          <div className="title-input-wrapper relative text-xs  font-medium sm:text-sm md:text-sm">
            <span className="px-2 opacity-0">{inputTitle}</span>
            <input
              className="absolute -top-2 left-0 z-10 h-[35px] w-full cursor-text rounded-md bg-[#f8f7f7] pl-2 outline-none  hover:bg-[#909e9e1a] focus-visible:border focus-visible:border-[#3b82f6] focus-visible:ring-2 focus-visible:ring-blue-500"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          <button className="tems-center text-body flex h-fit min-w-0 flex-shrink justify-center gap-x-1 truncate rounded-md border p-1.5 text-xs font-medium transition-all hover:bg-[#909e9e1a] sm:gap-x-2 sm:text-sm md:px-2 md:py-2 md:text-sm">
            <span className="inline-flex h-3 w-3.5 items-center justify-center ">
              <div className="h-full w-full pt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-black"
                  viewBox="0 0 512 512"
                >
                  <path
                    strokeWidth={32}
                    d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                    strokeMiterlimit="10"
                    className="fill-none"
                  ></path>
                  <path
                    strokeWidth={32}
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    d="M338.29 338.29L448 448"
                  ></path>
                </svg>
              </div>
            </span>
            <span className="truncate">Chat history</span>
          </button>
          <a href="/home">
            <button className=" flex h-fit min-w-0 max-w-fit flex-shrink items-center  justify-center gap-x-1 rounded-md border bg-[#0083da] p-1.5 text-xs font-medium text-white hover:bg-[#02599B] sm:gap-x-2 sm:text-sm md:px-2 md:py-2 md:text-sm">
              <span className="inline-flex w-3 items-center justify-center">
                <div className="icon-inner h-full w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-white"
                    viewBox="0 0 512 512"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth={32}
                      strokeLinejoin="round"
                      d="M256 112v288M400 256H112"
                      className=""
                    ></path>
                  </svg>
                </div>
              </span>
              <span className="hidden min-w-0 flex-shrink truncate sm:inline">
                New chat
              </span>
            </button>
          </a>
          <button className="text-body flex h-fit items-center  justify-center gap-x-1 whitespace-nowrap rounded-md p-1.5 text-xs font-medium hover:bg-[#909e9e1a] sm:!h-[35px] sm:gap-x-1 sm:text-sm md:px-1 md:py-1.5 md:text-sm">
            <span className="inline-flex w-3 items-center justify-center">
              <div className="h-full w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-black"
                  viewBox="0 0 512 512"
                >
                  <circle cx="256" cy="256" r="48"></circle>
                  <circle cx="256" cy="416" r="48"></circle>
                  <circle cx="256" cy="96" r="48"></circle>
                </svg>
              </div>
            </span>
          </button>
          <button
            className=" text-body flex h-fit  min-w-0 max-w-fit flex-shrink items-center justify-center gap-x-1 rounded-md border p-1.5 text-xs font-medium hover:bg-[#909e9e1a] sm:gap-x-2 sm:text-sm md:px-2 md:py-2 md:text-sm"
            type="button"
          >
            Prompt library
            <span className="inline-flex w-3.5 items-center justify-center">
              <div className="h-full w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-black"
                  viewBox="0 0 512 512"
                >
                  <path
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    d="M80 160h352M80 256h352M80 352h352"
                    strokeWidth={32}
                    className=""
                  ></path>
                </svg>
              </div>
            </span>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
