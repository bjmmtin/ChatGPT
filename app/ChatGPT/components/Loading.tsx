import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Loading = () => {
  const override = {
    color: "#000",
    loading: true,
  };

  return (
    <div>
      <div className="grouprelative flex items-start md:mx-auto md:max-w-3xl xl:max-w-4xl">
        <div className="flex-1 overflow-hidden px-2">
          <div className="overflow-x-auto pt-2">
            <PulseLoader
              color={override.color}
              loading={override.loading}
              cssOverride={override}
              size={8}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
