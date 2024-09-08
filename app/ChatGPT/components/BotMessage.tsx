import React from "react";

interface Props {
  botMessage: string | null;
}

const BotMessage: React.FC<Props> = ({ botMessage }) => {
  return (
    <div>
      <div className="grouprelative flex items-start md:mx-auto md:max-w-3xl xl:max-w-4xl">
        <div className="flex-1 overflow-hidden px-2">
          <div className="overflow-x-auto pt-2">
            <div>
              <div className="px-1 pb-2">
                <div className="markdown prose prose-sm prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-headings:my-2 prose-p:my-2 prose-blockquote:my-2 prose-blockquote:font-normal prose-pre:rounded-none prose-li:pl-1 prose-ol:pl-2  prose-ol:pb-2 prose-pre:bg-transparent prose-li:m-0 prose-ul:p-0 prose-ol:m-0 prose-ul:m-0 prose-hr:my-4 prose-th:font-semibold prose-tr:border-border prose-tr:border-b prose-th:text-left max-w-full leading-[1.5rem] text-black">
                  <pre className="overflow-auto whitespace-pre-wrap break-words">{botMessage}</pre>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between transition-opacity group-hover:opacity-100">
              <div className="flex gap-x-1.5 rounded-md pb-1">
                <button className="text-foreground flex h-fit items-center justify-center gap-x-1 rounded-md border border-solid p-1 text-xs font-medium hover:bg-[#909e9e1a]">
                  <span className="inline-flex w-3 items-center justify-center">
                    <div className="h-full w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-black"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M336 64h32a48 48 0 0148 48v320a48 48 0 01-48 48H144a48 48 0 01-48-48V112a48 48 0 0148-48h32"
                          strokeLinejoin="round"
                          className="fill-none"
                          strokeWidth={32}
                        ></path>
                        <rect
                          x="176"
                          y="32"
                          width="160"
                          height="64"
                          rx="26.13"
                          ry="26.13"
                          strokeLinejoin="round"
                          className="fill-none"
                          strokeWidth={32}
                        ></rect>
                      </svg>
                    </div>
                  </span>
                  Copy
                </button>
                <button className="flex h-fit w-fit items-center justify-center gap-x-1 rounded-md border border-solid p-1 text-xs font-medium hover:bg-[#909e9e1a]">
                  <span className="text-foreground inline-flex h-4 w-4 items-center justify-center">
                    <div className="h-full w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-black"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M320 146s24.36-12-64-12a160 160 0 10160 160"
                          strokeWidth={32}
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          className="fill-none"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={32}
                          d="M256 58l80 80-80 80"
                          className="fill-none"
                        ></path>
                      </svg>
                    </div>
                  </span>
                  Retry
                </button>
                <div className="flex flex-row items-center gap-x-1 text-slate-500">
                  <button
                    className="text-body inline-flex h-fit items-center justify-center rounded-md border border-solid p-1 text-sm font-medium hover:bg-[#909e9e1a]"
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="radix-:rp:"
                    data-state="closed"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 stroke-green-500 "
                    >
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                  </button>
                  <button
                    className="text-body inline-flex h-fit items-center justify-center rounded-md border border-solid p-1 text-sm font-medium hover:bg-[#909e9e1a]"
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="radix-:rs:"
                    data-state="closed"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 stroke-red-500"
                    >
                      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotMessage;
