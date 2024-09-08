import React from "react";

const NavBar = () => {
  return (
    <div
      className="flex h-[48px] w-full flex-col items-center justify-center gap-2
        border-b px-3 py-2 sm:flex-row"
    >
      <div className="flex flex-col gap-1 py-1.5 text-sm font-medium">
        <div>
          <span className="font-medium">
            Welcome! You have 14 days left in your trial.
          </span>
        </div>
        <div
          aria-valuemax={14}
          aria-valuemin={0}
          role="progressbar"
          data-state="indeterminate"
          data-max="14"
          className="relative h-2 w-full overflow-hidden rounded-full bg-white"
        >
          <div
            data-state="indeterminate"
            data-max="14"
            className="h-full w-full flex-1 bg-[#c6caca] transition-all"
          ></div>
        </div>
      </div>
      <button
        className="text-body inline-flex h-fit items-center  justify-center rounded-md p-3 px-3 py-1.5 text-sm font-semibold hover:bg-[#909e9e1a]"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="radix-:rd:"
        data-state="closed"
      >
        🚀 Subscribe now
      </button>
    </div>
  );
};

export default NavBar;
