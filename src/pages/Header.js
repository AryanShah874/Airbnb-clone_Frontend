import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import Search from "./Search";

function Header() {
    const {userInfo}=useContext(UserContext);

    return (
        <div>
            <header>
                <div className="p-6 flex justify-between items-center">
                    <Link to="/" className="font-bold text-xl text-red-500">
                        <i className="fa-brands fa-airbnb fa-2xl"></i> airbnb
                    </Link>

                    <Search />

                    <div>
                        <Link to={userInfo ? "/account" :  "/login"} className="flex gap-2 justify-center items-center border border-gray-300 rounded-full px-4 py-3 cursor-pointer">
                            <i className="fa-solid fa-user"></i>
                            {userInfo ?
                            <div>
                                {userInfo.name}
                            </div> :
                                <i className="fa-solid fa-bars"></i>
                            }
                        </Link>
                    </div>
                </div>
            </header>
            <hr />
        </div>
    );
}

export default Header;
