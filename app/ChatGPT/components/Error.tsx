import React from "react";

const Error = (err: { message: string | undefined }) => {
  return (
    <div className="grouprelative flex items-start md:mx-auto md:max-w-3xl xl:max-w-4xl">
      <div className="flex-1 overflow-hidden px-2">
        <div className="overflow-x-auto pt-2">
          An error occurred - {err.message}. Refresh the page and try again later.
        </div>
      </div>
    </div>
  );
};

export default Error;
