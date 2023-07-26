import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import Loader from "../components/Loader";

// Account mai my accomodation walla
function Places(){
    const [places, setPlaces]=useState([]);

    const [loading, setLoading]=useState(false);

    useEffect(()=>{
        fetch("https://airbnb-clone-backend-8i7m.onrender.com/places", {
            method: 'GET',
            credentials: 'include'
        })
        .then((response)=>{return response.json()})
        .then((data)=>{
            setLoading(true);
            return setPlaces(data);})
    }, [])

    return(
        <div className="mb-16">
            <AccountNav />

            <div className="text-center">
                <Link to={"/account/places/new"} className="inline-flex gap-2 items-center bg-red-500 text-white px-6 py-2 rounded-full">
                    <i className="fa-solid fa-plus"></i>
                    Add new place
                </Link>
            </div>

            {!loading && <Loader />}

            <div className="mt-4">
                {places.length>0 && places.map((place, index)=>{
                    return(
                        <Link to={"/account/places/"+place._id} key={index} className="flex gap-4 bg-gray-100 p-4 rounded-2xl mb-4">

                            <div className="h-32 w-32 bg-gray-300 shrink-0">
                                {place.photos.length>0 && (
                                    <img src={"https://airbnb-clone-backend-8i7m.onrender.com/"+place.photos[0]} alt="main" className="h-full w-full"/>
                                )}
                            </div>

                            <div>
                                <h2 className="text-xl">{place.name}</h2>
                                <p className="text-sm mt-2">{place.description}</p>
                            </div>
            
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default Places;