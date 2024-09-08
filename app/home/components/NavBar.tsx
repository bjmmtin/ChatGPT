import React from "react";

const NavBar = () => {
    return (
        <div className="w-full h-[48px] flex items-center justify-center py-2 border-b
        flex-col sm:flex-row gap-2 px-3">
            <div className="flex text-sm font-medium flex-col gap-1 py-1.5">
                <div>
                    <span className="font-medium">Welcome! You have 14 days left in your trial.</span>
                </div>
                <div aria-valuemax="14" aria-valuemin="0" role="progressbar" data-state="indeterminate" data-max="14" className="relative h-2 overflow-hidden rounded-full bg-black w-full">
                    <div data-state="indeterminate" data-max="14" className="h-full w-full flex-1 bg-[#c6caca] transition-all" ></div>
                </div>
            </div>
            <button className="inline-flex items-center justify-center text-sm  p-3 hover:bg-[#909e9e1a] text-body px-3 h-fit py-1.5 rounded-md font-semibold" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:rd:" data-state="closed">🚀 Subscribe now
            </button>
        </div>
    )
}

export default NavBar;