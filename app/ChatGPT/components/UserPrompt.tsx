import Image from "next/image";
import React from "react";

interface ChatPromptProps {
  inputPrompt: string; // Current value of the textarea
}

const ChatPrompt: React.FC<ChatPromptProps> = ({
  inputPrompt,
}) => {
  return (
    <div>
      <div className="grouprelative flex items-start md:mx-auto md:max-w-3xl xl:max-w-4xl ">
        <div className="flex-1 overflow-hidden px-1 py-2 ">
          <div className="flex flex-col items-center bg-[#F7F7F7]">
            <div className="bg-background-root border-outline border-md w-full overflow-hidden rounded-md border border-solid">
              <div
                className="animate-fade-in bg-background-root w-full p-2 transition-all duration-75"
                role="presentation"
                tabIndex={0}
              >
                <input
                  accept="application/pdf,image/png,image/jpeg,text/plain,text/markdown,application/json,text/html,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/rtf,text/rtf,text/richtext,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  tabIndex={-1}
                  type="file"
                  className="hidden"
                />

                  <div className="relative flex h-full flex-1 items-stretch">
                    <div className="chat-form-selector flex w-full flex-col">
                      <div className="flex w-full flex-wrap items-center justify-start gap-1.5"></div>
                      <div className="relative flex w-full">
                        <div className="relative flex w-full flex-col gap-y-2">
                          <pre
                            className="overflow-auto whitespace-pre-wrap break-words text-foreground m-0  h-full  resize-none rounded-md border border-solid p-1.5 text-sm outline-none focus-visible:bg-white hover:bg-[#909e9e1a] focus-visible:border focus-visible:border-[#3b82f6]  focus-visible:ring-2 focus-visible:ring-blue-500"
                          >
                            {inputPrompt}
                          </pre>
                        </div>
                      </div>
                      <div className="flex w-full flex-row items-start justify-between pt-1.5">
                        <div className="flex gap-x-1.5">
                          <div className="flex flex-col">
                            <button
                              className="text-body z-50 flex h-8 w-fit items-center justify-center gap-x-[3px] self-start rounded-md border border-solid p-3 px-2 py-1 text-[14px] font-medium hover:bg-[#909e9e1a]"
                              type="button"
                            >
                              <span className="inline-flex h-4 w-4 items-center justify-center">
                                <div className="h-full w-full">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-black"
                                    viewBox="0 0 512 512"
                                  >
                                    <path
                                      d="M216.08 192v143.85a40.08 40.08 0 0080.15 0l.13-188.55a67.94 67.94 0 10-135.87 0v189.82a95.51 95.51 0 10191 0V159.74"
                                      strokeLinecap="round"
                                      strokeMiterlimit="10"
                                      className="fill-none"
                                      strokeWidth={32}
                                    ></path>
                                  </svg>
                                </div>
                              </span>
                              <span>Attach</span>
                            </button>
                            <input
                              accept="application/pdf,image/png,image/jpeg,text/plain,text/markdown,application/json,text/html,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/rtf,text/rtf,text/richtext,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                              tabIndex={-1}
                              className="hidden"
                              type="file"
                            />
                          </div>
                          <button
                            className="text-body flex h-8 w-fit items-center justify-center gap-x-[3px] rounded-md border border-solid p-3 px-2 py-1 text-[14px] font-medium hover:bg-[#909e9e1a]"
                            type="button"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="radix-:rv:"
                            data-state="closed"
                          >
                            <span className="mr-1 inline-flex h-2 w-4 items-center justify-center">
                              <div className="h-full w-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="-mt-1 stroke-black"
                                  viewBox="0 0 512 512"
                                >
                                  <path d="M479.66 268.7l-32-151.81C441.48 83.77 417.68 64 384 64H128c-16.8 0-31 4.69-42.1 13.94s-18.37 22.31-21.58 38.89l-32 151.87A16.65 16.65 0 0032 272v112a64 64 0 0064 64h320a64 64 0 0064-64V272a16.65 16.65 0 00-.34-3.3zm-384-145.4v-.28c3.55-18.43 13.81-27 32.29-27H384c18.61 0 28.87 8.55 32.27 26.91 0 .13.05.26.07.39l26.93 127.88a4 4 0 01-3.92 4.82H320a15.92 15.92 0 00-16 15.82 48 48 0 11-96 0A15.92 15.92 0 00192 256H72.65a4 4 0 01-3.92-4.82z"></path>
                                  <path d="M368 160H144a16 16 0 010-32h224a16 16 0 010 32zM384 224H128a16 16 0 010-32h256a16 16 0 010 32z"></path>
                                </svg>
                              </div>
                            </span>
                            <span>Prompts</span>
                          </button>
                          <div className="flex gap-x-0.5">
                            <button
                              className="flex h-8 w-fit items-center justify-center gap-x-[3px] self-start rounded-md border border-solid p-3 px-2 py-1 text-[14px] font-medium text-blue-500 hover:bg-[#909e9e1a]"
                              disabled={false}
                              type="button"
                            >
                              <span className="text-accent inline-flex h-4 w-4 items-center justify-center">
                                <div className="h-full w-full">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-blue-500"
                                    viewBox="0 0 512 512"
                                  >
                                    <rect
                                      strokeMiterlimit="10"
                                      x="280.48"
                                      y="122.9"
                                      width="63.03"
                                      height="378.2"
                                      rx="31.52"
                                      transform="rotate(-45 312.002 311.994)"
                                      className="fill-none"
                                      strokeWidth={32}
                                    ></rect>
                                    <path
                                      d="M178.38 178.38a31.64 31.64 0 000 44.75L223.25 268 268 223.25l-44.87-44.87a31.64 31.64 0 00-44.75 0z"
                                      strokeWidth={32}
                                    ></path>
                                    <path
                                      strokeMiterlimit="10"
                                      strokeWidth={32}
                                      strokeLinecap="round"
                                      d="M48 192h48M90.18 90.18l33.94 33.94M192 48v48M293.82 90.18l-33.94 33.94M124.12 259.88l-33.94 33.94"
                                    ></path>
                                  </svg>
                                </div>
                              </span>
                              <span className="text-accent">Easy Prompt™</span>
                            </button>
                            <span
                              className="flex items-center"
                              data-state="closed"
                            >
                              <span className="inline-flex h-4 w-4 cursor-pointer items-center justify-center transition-all duration-300 ">
                                <div className="h-full w-full">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-[#8a8888] hover:stroke-black"
                                    viewBox="0 0 512 512"
                                  >
                                    <path
                                      d="M256 80a176 176 0 10176 176A176 176 0 00256 80z"
                                      strokeMiterlimit="10"
                                      strokeWidth={28}
                                      className="fill-none"
                                    ></path>
                                    <path
                                      d="M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45 10 4.76 29.47 16.38 29.47 41.09 0 26-17 37.81-36.37 50.8S251 281.43 251 296"
                                      strokeWidth={28}
                                      strokeLinecap="round"
                                      strokeMiterlimit="10"
                                      className="fill-none"
                                    ></path>
                                    <circle cx="250" cy="348" r="20"></circle>
                                  </svg>
                                </div>
                              </span>
                            </span>
                          </div>
                          <div className="flex w-fit items-center"></div>
                        </div>
                      </div>
                    </div>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPrompt;
