import React from "react";
import { useLocation, Link, useParams } from "react-router-dom";

function AccountNav(){
    
    const location=useLocation();
    const {id}=useParams();

    const handleClasses=(type=null)=>{
        let classes="flex gap-2 items-center py-2 px-6 rounded-full";
        
        if((type==='profile' && location.pathname==='/account') || (type==='bookings' && location.pathname==='/account/bookings') || (type==='places' && (location.pathname==='/account/places' || location.pathname==='/account/places/new' || location.pathname==='/account/places/'+id))){
            classes+=" bg-red-500 text-white";
        }
        else{
            classes+=" bg-gray-200"
        }
        
        return classes;
    }

    return(
        <div>
            <nav className="flex justify-center mt-8 gap-2 w-full mb-8">
                <Link to="/account" className={handleClasses("profile")}>
                    <i className="fa-solid fa-user"></i>
                    My profile
                </Link>
                <Link to="/account/bookings" className={handleClasses("bookings")}>
                    <i className="fa-solid fa-pen-to-square"></i>
                    My bookings
                </Link>
                <Link to="/account/places" className={handleClasses("places")}>
                    <i className="fa-solid fa-building-user"></i>
                    My accommodations
                </Link>
            </nav>
        </div>
    );
}

export default AccountNav;