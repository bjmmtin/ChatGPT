import React from "react";

const Error = (err: { message: string | undefined }) => {
  return (
    <div className="errorMessage">
      An error occurred - {err.message}. Refresh the page and try again later.
    </div>
  );
};

export default Error;
