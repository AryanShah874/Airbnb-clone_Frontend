import React, { useContext, useState } from "react";
import { differenceInCalendarDays } from 'date-fns';
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { toast } from 'react-toastify';

function BookingWidget(props){
    const {userInfo}=useContext(UserContext);

    const [booking, setBooking]=useState({checkIn: new Date().toJSON().slice(0, 10), checkOut: new Date().toJSON().slice(0, 10), guests: 1, name: userInfo?.name, mobileNo: ''});  //?. if value null no problem

    const [redirect, setRedirect]=useState('');

    const handleChange=(event)=>{
        setBooking({...booking, [event.target.name]: event.target.value});
    }

    let nights=0;
    nights=differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn));

    const handleClick=async(event)=>{
        event.preventDefault();

        if(nights<=0){
            toast.error("Invalid Dates", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            return;
        }
        booking.placeId=props.place._id;
        booking.price=nights*props.place.price;

        const response=await fetch("http://localhost:5000/bookPlace",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(booking)
        });

        const res=await response.json();

        if(response.ok){
            toast.success(res.success, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            setRedirect("/account/bookings");
        }
        else{
            if(response.status===401){
                toast.success(res.error, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                setRedirect("/login");
            }
        }
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return(
        <div className="flex flex-col justify-center bg-white shadow-xl shadow-gray-400 p-4 rounded-2xl">
            <div className="text-2xl">
                &#8377;{props.place.price} per night
            </div>
        
            <div className="border-2 rounded-2xl my-4">
                <div className="flex justify-around">
                    <div className="py-3 px-4">
                        <label>Check-in: </label><br />
                        <input type="date" name="checkIn" value={booking.checkIn} onChange={handleChange} min={new Date().toJSON().slice(0, 10)}/>
                    </div>
                    <div className="py-3 px-4 border-l-2">
                        <label>Check-out: </label><br />
                        <input type="date" name="checkOut" value={booking.checkOut} onChange={handleChange} min={new Date().toJSON().slice(0, 10)}/>                          
                    </div>
                </div>
                <div className="flex items-center py-3 px-4 border-t-2">
                    <label className="w-1/2">No. of guests: </label>
                    <input type="number" name="guests" value={booking.guests} onChange={handleChange} min={1} max={props.place.maxGuests}/>                  
                </div>

                {nights>0 && (
                    <div>
                        <div className="flex items-center py-3 px-4">
                            <label className="w-1/2">Full Name: </label>
                            <input type="tel" name="name" value={booking.name} onChange={handleChange} />
                        </div>
                        <div className="flex items-center py-3 px-4">
                            <label className="w-1/2">Mobile no. : </label>
                            <input type="tel" name="mobileNo" value={booking.mobileNo} onChange={handleChange} required/>
                        </div>
                    </div>
                )}
            </div>

            <button onClick={handleClick} className="text-white bg-red-500 p-2 w-full rounded-2xl">Book this place {nights>0 && <span>for &#8377;{nights*props.place.price}</span>}</button>
        </div>
    );
}

export default BookingWidget;