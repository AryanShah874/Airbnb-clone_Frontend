import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";
import Loader from "../components/Loader";

// For all viewers
function PlacePage(){

    const {id}=useParams();

    const [place, setPlace]=useState({
        name: "",
        address: "",
        photos: [],
        description: "",
        emenities: [],
        extraInfo: "",
        checkIn: "",
        checkOut: "",
        maxGuests: 1,
        price: 0
    });

    const [showPhotos, setShowPhotos]=useState(false);

    const [loading, setLoading]=useState(false);

    useEffect(()=>{
        fetch(`https://airbnb-clone-backend-one.vercel.app/places/${id}`, {
            method: 'GET'
        })
        .then((response)=>{return response.json()})
        .then((data)=>{
            setLoading(true);
            return setPlace(data);
        })
    }, [id]);  //so that everytime the id changes we want to get info about the place

    if(!loading){
        return <Loader />
    }

    if(showPhotos && loading){
        return(
            <div className="absolute inset-0 min-h-screen min-w-full bg-white">
                <div className="p-8 grid gap-4">
                    <h2 className="text-2xl font-semibold mr-48">Photos of {place.name}</h2>
                    <button onClick={()=>{setShowPhotos(false)}} className="fixed top-8 right-12 bg-gray-500 text-white px-3 py-2 rounded-2xl"><i className="fa-solid fa-xmark"></i> Close photos</button>
                    {place?.photos?.length>0 && (
                        place.photos.map((photo, index)=>{
                            return(
                                <img src={+photo} alt={"photo "+index} className="h-96 w-2/3 m-auto"/>
                            ); 
                        })
                    )}
                </div>
            </div>
        );
    }

    return(
        <div className="mt-4 mb-8 bg-gray-100 -mx-8 p-8">
            <h1 className="text-3xl">{place.name}</h1>
            <a rel="noreferrer" target="_blank" href={`https://maps.google.com?q=${place.address}`} className="my-2 inline-block font-semibold underline"><i className="fa-solid fa-location-dot"></i> {place.address}</a>

            <div className="relative">
                <div className="grid gap-3 grid-cols-[2fr_1fr]">  {/*To get 2 columns of 2:1 ratio */}

                    <div>
                        {place.photos?.[0] && (
                            <img className="rounded-l-2xl h-full w-full" src={place.photos?.[0]} alt="main" />
                        )}
                    </div>

                    <div className="grid gap-4">
                        {place.photos?.[1] && (
                            <img className="h-72 w-full rounded-tr-2xl" src={place.photos?.[1]} alt="img-1" />
                        )}
                        {place.photos?.[2] && (
                            <img className="h-72 w-full rounded-br-2xl" src={+place.photos?.[2]} alt="img-2" />
                        )}
                    </div>
                </div>

                <button onClick={()=>{setShowPhotos(true)}} className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-xl shadow-gray-500 text-sm"><i className="fa-solid fa-images"></i> Show all photos</button>
            </div>


            <div className="grid gap-8 grid-cols-[2fr_1fr] mt-8">
                <div>
                    <div className="mt-4">
                        <h2 className="text-2xl font-semibold">Description</h2>
                        {place.description}
                    </div>
                    <div className="text-gray-500 my-4">
                        Check-in: {place.checkIn} <br />
                        Check-out: {place.checkOut} <br />
                        Max Guests: {place.maxGuests}
                    </div>
                </div>
                <BookingWidget place={place}/>
            </div>

            {place.emenities.length && (
                <div>
                    <h2 className="text-2xl font-semibold">What this place has to offer</h2>
                    <div className="grid gap-1 mt-2 grid-cols-3">
                        <div className={`gap-2 items-center p-4 rounded-2xl ${place.emenities.find((emenity)=>{return emenity==="cityView"}) ? "flex" : "hidden"}`}>
                            <i className="fa-solid fa-city"></i>
                            <span>City view</span>
                        </div>
                        <div className={`gap-2 items-center p-4 rounded-2xl ${place.emenities.find((emenity)=>{return emenity==="gardenView"}) ? "flex" : "hidden"}`}>
                            <i className="fa-solid fa-tree"></i>
                            <span>Garden view</span>
                        </div>
                        <div className={`gap-2 items-center p-4 rounded-2xl ${place.emenities.find((emenity)=>{return emenity==="mountainView"}) ? "flex" : "hidden"}`}>
                            <i className="fa-solid fa-mountain-sun"></i>
                            <span>Mountain view</span>
                        </div>
                        <div className={`gap-2 items-center p-4 rounded-2xl ${place.emenities.find((emenity)=>{return emenity==="oceanView"}) ? "flex" : "hidden"}`}>
                            <i className="fa-solid fa-water"></i>
                            <span>Ocean view</span>
                        </div>
                        <div className={`gap-2 items-center p-4 rounded-2xl ${place.emenities.find((emenity)=>{return emenity==="kitchen"}) ? "flex" : "hidden"}`}>
                            <i className="fa-solid fa-kitchen-set"></i>
                            <span>Kitchen</span>
                        </div>
                        <div className={`gap-2 items-center p-4 rounded-2xl ${place.emenities.find((emenity)=>{return emenity==="freeParking"}) ? "flex" : "hidden"}`}>
                            <i className="fa-solid fa-square-parking"></i>
                            <span>Free Parking</span>
                        </div>
                        <div className={`gap-2 items-center p-4 rounded-2xl ${place.emenities.find((emenity)=>{return emenity==="wifi"}) ? "flex" : "hidden"}`}>
                            <i className="fa-solid fa-wifi"></i>
                            <span>Wifi</span>
                        </div>
                        <div className={`gap-2 items-center p-4 rounded-2xl ${place.emenities.find((emenity)=>{return emenity==="tv"}) ? "flex" : "hidden"}`}>
                            <i className="fa-solid fa-tv"></i>
                            <span>TV</span>
                        </div>
                        <div className={`gap-2 items-center p-4 rounded-2xl ${place.emenities.find((emenity)=>{return emenity==="airConditioning"}) ? "flex" : "hidden"}`}>
                            <i className="fa-solid fa-snowflake"></i>
                            <span>Air conditioning</span>
                        </div>
                        <div className={`gap-2 items-center p-4 rounded-2xl ${place.emenities.find((emenity)=>{return emenity==="privatePool"}) ? "flex" : "hidden"}`}>
                            <i className="fa-solid fa-person-swimming"></i>
                            <span>Private pool</span>
                        </div>
                        <div className={`gap-2 items-center p-4 rounded-2xl ${place.emenities.find((emenity)=>{return emenity==="washingMachine"}) ? "flex" : "hidden"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14.83 11.17a4.008 4.008 0 0 1 0 5.66a4.008 4.008 0 0 1-5.66 0l5.66-5.66M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m1 2a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m3 0a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m2 4a6 6 0 0 0-6 6a6 6 0 0 0 6 6a6 6 0 0 0 6-6a6 6 0 0 0-6-6Z"/></svg>
                            <span>Washing Machine</span>
                        </div>
                        <div className={`gap-2 items-center p-4 rounded-2xl ${place.emenities.find((emenity)=>{return emenity==="privateBalcony"}) ? "flex" : "hidden"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 12v-2h2v2H8Zm6 0v-2h2v2h-2ZM3 22v-8h1v-4q0-1.65.625-3.113t1.713-2.55q1.087-1.087 2.55-1.712T12 2q1.65 0 3.113.625t2.55 1.713q1.087 1.087 1.712 2.55T20 10v4h1v8H3Zm2-2h2v-4H5v4Zm4 0h2v-4H9v4Zm-3-6h5V4.075q-2.15.35-3.575 2.012T6 10v4Zm7 0h5v-4q0-2.25-1.425-3.913T13 4.075V14Zm0 6h2v-4h-2v4Zm4 0h2v-4h-2v4Z"/></svg>
                            <span>Private patio or balcony</span>
                        </div>
                    </div>
                </div>
            )}  

            {place.extraInfo && (
                <div className="mt-4">
                    <h2 className="text-2xl font-semibold">Extra</h2>
                    {place.extraInfo}
                </div>
            )}       

        </div>
    );
}

export default PlacePage;