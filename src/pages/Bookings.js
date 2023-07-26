import React, { useEffect, useState } from "react";
import AccountNav from "./AccountNav";
import { differenceInCalendarDays } from "date-fns";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function Bookings(){

    const [bookings, setBookings]=useState([]);

    const [loading, setLoading]=useState(false);

    useEffect(()=>{
        fetch("https://airbnb-clone-backend-one.vercel.app/bookings", {
            method: "GET",
            credentials: "include"
        })
        .then((response)=>{return response.json()})
        .then((data)=>{
            setLoading(true);
            return setBookings(data);
        })
    }, [])

    if(!loading){
        return(
            <div>
                <AccountNav />
                <Loader />
            </div>
        );
    }

    return(
        <div className="mb-16">
            <AccountNav />

            <div>
                {bookings?.length>0 ? bookings.map((booking, index)=>{
                    return(
                        <Link to={`/place/${booking.place._id}`} key={index} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                            {booking.place.photos?.[0] && (
                                <div className="w-48">
                                    <img src={"https://airbnb-clone-backend-one.vercel.app/"+booking.place.photos?.[0]} alt="mainImg" />
                                </div>
                            )}
                            <div className="py-3 pr-3 grow">
                                <h2 className="text-xl font-semibold">{booking.place.name}</h2>
                                <div className="py-2 text-gray-700">
                                    <div>
                                        <i className="fa-solid fa-moon"></i> {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights | {booking.checkIn} to {booking.checkOut}
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-tag"></i> Total: &#8377;{booking.price}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                }) : 
                <div className="text-xl text-gray-500">
                    No bookings found.
                </div>}
            </div>
        </div>
    );
}

export default Bookings;