import React from "react";

function Loader() {
    return(
        <div className="text-center mt-28">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent border-red-400 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
    );

}

export default Loader;
