import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "./AccountNav";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

// Account mai my accomodation walla

function PlacesForm(){

    let [form, setForm]=useState({
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
    
    const [photoLink, setPhotoLink]=useState('');

    const [redirect, setRedirect]=useState('');

    const {id}=useParams();
    
    useEffect(()=>{
        if(!id){
            return;
        }

        fetch("https://airbnb-clone-backend-one.vercel.app/places/"+id, {
            method: 'GET'
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            return setForm(data);  //also adds new property to form i.e. _id which is used when updating the place info
        })
    }, [id])

    const handleChange=(event)=>{
        setForm({...form, [event.target.name]: event.target.value});
    }

    const addPhotoByLink=async (event)=>{
        event.preventDefault();
        
        if(photoLink){
            // setForm({...form, [form.photos]: form.photos.push(photoLink)});
            // const formData=new FormData();
            // formData.append('link', photoLink);

            // alert(formData);
            
            // const response=await fetch("https://airbnb-clone-backend-one.vercel.app/upload", {
            //     method: 'POST', 
            //     body: photoLink
            // });
    
            // if(response.ok){
            //     const photoUrl=await response.text();
            //     setForm({...form, [form.photos]: form.photos.push(photoUrl)});
            //     // console.log(photoUrl);
            // }

            const imageData={
                file: photoLink,
                upload_preset: "airbnb",
                folder: "airbnb"
            };

            const response=await fetch("https://api.cloudinary.com/v1_1/dmamth1y2/image/upload", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(imageData)
            });

            const {secure_url}=await response.json();

            if(response.ok){
                setForm({...form, [form.photos]: form.photos.push(secure_url)});
            }
            else{
                toast.warn('Sorry, something went wrong.', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
        else{
            toast.warn('Url Required', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        setPhotoLink('');
    }

    const uploadPhoto=async (event)=>{
        const formData=new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('upload_preset', "airbnb");
        formData.append('folder', 'airbnb');

        const response=await fetch("https://api.cloudinary.com/v1_1/dmamth1y2/image/upload", {   //No backend url required
            method: 'POST',
            body: formData
        });

        const {secure_url}=await response.json();

        if(!response.ok){
            toast.warn('Sorry, something went wrong.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else{
            setForm({...form, [form.photos]: form.photos.push(secure_url)});
        }


        // const response=await fetch("https://airbnb-clone-backend-one.vercel.app/upload", {
        //     method: 'POST', 
        //     body: formData
        // });

        // if(response.ok){
        //     const photoUrl=await response.text();
        // }
    }

    const deletePhoto=async (index)=>{
        // const response=await fetch(`https://airbnb-clone-backend-one.vercel.app/deletePhoto/${form.photos[index]}`, {
        //     method: 'DELETE',

        // });
        const publicId = form.photos[index].split('/').slice(-2).join('/').replace(/\.[^/.]+$/, '');
// https://api.cloudinary.com/v1_1/demo/image/upload
        const response=await fetch(`https://api.cloudinary.com/v1_1/dmamth1y2/image/destroy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('457433856849257: 60btJdMtmou0FElnGefzcDxHLc0')
            },
            body: JSON.stringify({public_id: publicId})
        });

        if(response.ok){
            setForm({...form, [form.photos]: form.photos.splice(index, 1)})
        }
        else{
            toast.warn('Sorry, something went wrong.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });   
        }
    }

    const handleCheckbox=(event)=>{
        if(event.target.checked){
            setForm({...form, [form.emenities]: form.emenities.push(event.target.name)});
        }
        else{
            const index=form.emenities.indexOf(event.target.name);
            setForm({...form, [form.emenities]: form.emenities.splice(index, 1)});
        }
    }

    const handleSubmit=async(event)=>{

        event.preventDefault();

        if(id){
            //update a place
            const response=await fetch("https://airbnb-clone-backend-one.vercel.app/places", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(form)
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
                setRedirect("/account/places")
            }
        }
        else{
            //add new place
            const response=await fetch("https://airbnb-clone-backend-one.vercel.app/places", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(form)
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
                setRedirect("/account/places")
            }
        }
    }

    //Delete functionality
    const handleClick=async()=>{
        const response=await fetch("https://airbnb-clone-backend-one.vercel.app/places", {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({id})
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
            setRedirect('/account/places');
        }
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return(
        <div className="mb-16">
            <AccountNav />

            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl mt-4">Name</h2>
                <p className="text-sm text-gray-500">Name for your place. should be short & catchy</p>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="name" required autoComplete="off" />

                <h2 className="text-2xl mt-4">Address</h2>
                <p className="text-sm text-gray-500">Address to this place</p>
                <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="address" required autoComplete="off"/>

                <h2 className="text-2xl mt-4">Photos</h2>
                <p className="text-sm text-gray-500">More is better. Note: first photo that you upload will be used as preview.</p>
                <div className="flex gap-2">
                    <input type="text" value={photoLink} onChange={(event)=>{setPhotoLink(event.target.value)}} placeholder="Add using a link ...jpg" />
                    <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photos</button>
                </div>
                <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2">
                    {
                        form.photos.map((link, index)=>{
                            return (
                                <div className="relative h-32" key={index}>
                                    <i onClick={()=>{deletePhoto(index)}} className="fa-solid fa-xmark absolute top-1.5 right-1.5 text-black bg-white py-0.5 px-1 rounded-full cursor-pointer"></i>
                                    <img src={link} alt={"photo"+index} className="h-full w-full object-cover rounded-2xl"/>
                                    {/* <img src={"https://airbnb-clone-backend-one.vercel.app/"+link} alt={"photo"+index} className="h-full w-full object-cover rounded-2xl"/> */}
                                </div>
                            )
                        })  
                    }
                    <label className="flex justify-center items-center gap-1 h-32 text-2xl text-gray-500 border bg-transparent rounded-2xl p-14 cursor-pointer">
                        <input type="file" onChange={uploadPhoto} accept="image/*" className="hidden"/>
                        <i className="fa-solid fa-file-import"></i>
                        Upload
                    </label>
                </div>

                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-sm text-gray-800">Desrcribe your place.</p>
                <textarea name="description" value={form.description} onChange={handleChange} rows="5" autoComplete="off"/>

                <h2 className="text-2xl mt-4">Emenities</h2>
                <p className="text-sm text-gray-800">Select all the emenities available in your place.</p>
                <div className="grid gap-1 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <label className="flex gap-2 items-center border p-4 rounded-2xl cursor-pointer">
                        <input type="checkbox" name="cityView" onChange={handleCheckbox} checked={form.emenities.includes("cityView")}/>    {/* checked added so that it is checked if place has those emmenities when editing*/}
                        <i className="fa-solid fa-city"></i>
                        <span>City view</span>
                    </label>
                    <label className="flex gap-2 items-center border p-4 rounded-2xl cursor-pointer">
                        <input type="checkbox" name="gardenView" onChange={handleCheckbox} checked={form.emenities.includes("gardenView")}/>
                        <i className="fa-solid fa-tree"></i>
                        <span>Garden view</span>
                    </label>
                    <label className="flex gap-2 items-center border p-4 rounded-2xl cursor-pointer">
                        <input type="checkbox" name="mountainView" onChange={handleCheckbox} checked={form.emenities.includes("mountainView")}/>  
                        <i className="fa-solid fa-mountain-sun"></i>
                        <span>Mountain view</span>
                    </label>
                    <label className="flex gap-2 items-center border p-4 rounded-2xl cursor-pointer">
                        <input type="checkbox" name="oceanView" onChange={handleCheckbox} checked={form.emenities.includes("oceanView")}/>
                        <i className="fa-solid fa-water"></i>
                        <span>Ocean view</span>
                    </label>
                    <label className="flex gap-2 items-center border p-4 rounded-2xl cursor-pointer">
                        <input type="checkbox" name="kitchen" onChange={handleCheckbox} checked={form.emenities.includes("kitchen")}/>
                        <i className="fa-solid fa-kitchen-set"></i>
                        <span>Kitchen</span>
                    </label>
                    <label className="flex gap-2 items-center border p-4 rounded-2xl cursor-pointer">
                        <input type="checkbox" name="freeParking" onChange={handleCheckbox} checked={form.emenities.includes("freeParking")}/>
                        <i className="fa-solid fa-square-parking"></i>
                        <span>Free Parking</span>
                    </label>
                    <label className="flex gap-2 items-center border p-4 rounded-2xl cursor-pointer">
                        <input type="checkbox" name="wifi" onChange={handleCheckbox} checked={form.emenities.includes("wifi")}/>
                        <i className="fa-solid fa-wifi"></i>
                        <span>Wifi</span>
                    </label>
                    <label className="flex gap-2 items-center border p-4 rounded-2xl cursor-pointer">
                        <input type="checkbox" name="tv" onChange={handleCheckbox} checked={form.emenities.includes("tv")}/>
                        <i className="fa-solid fa-tv"></i>
                        <span>TV</span>
                    </label>
                    <label className="flex gap-2 items-center border p-4 rounded-2xl cursor-pointer">
                        <input type="checkbox" name="airConditioning" onChange={handleCheckbox} checked={form.emenities.includes("airConditioning")}/>
                        <i className="fa-solid fa-snowflake"></i>
                        <span>Air conditioning</span>
                    </label>
                    <label className="flex gap-2 items-center border p-4 rounded-2xl cursor-pointer">
                        <input type="checkbox" name="privatePool" onChange={handleCheckbox} checked={form.emenities.includes("privatePool")}/>
                        <i className="fa-solid fa-person-swimming"></i>
                        <span>Private pool</span>
                    </label>
                    <label className="flex gap-2 items-center border p-4 rounded-2xl cursor-pointer">
                        <input type="checkbox" name="washingMachine" onChange={handleCheckbox} checked={form.emenities.includes("washingMachine")}/>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14.83 11.17a4.008 4.008 0 0 1 0 5.66a4.008 4.008 0 0 1-5.66 0l5.66-5.66M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m1 2a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m3 0a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m2 4a6 6 0 0 0-6 6a6 6 0 0 0 6 6a6 6 0 0 0 6-6a6 6 0 0 0-6-6Z"/></svg>
                        <span>Washing Machine</span>
                    </label>
                    <label className="flex gap-2 items-center border p-4 rounded-2xl cursor-pointer">
                        <input type="checkbox" name="privateBalcony" onChange={handleCheckbox} checked={form.emenities.includes("privateBalcony")}/>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 12v-2h2v2H8Zm6 0v-2h2v2h-2ZM3 22v-8h1v-4q0-1.65.625-3.113t1.713-2.55q1.087-1.087 2.55-1.712T12 2q1.65 0 3.113.625t2.55 1.713q1.087 1.087 1.712 2.55T20 10v4h1v8H3Zm2-2h2v-4H5v4Zm4 0h2v-4H9v4Zm-3-6h5V4.075q-2.15.35-3.575 2.012T6 10v4Zm7 0h5v-4q0-2.25-1.425-3.913T13 4.075V14Zm0 6h2v-4h-2v4Zm4 0h2v-4h-2v4Z"/></svg>
                        <span>Private patio or balcony</span>
                    </label>
                </div>

                <h2 className="text-2xl mt-4">Extra Info</h2>
                <p className="text-sm text-gray-800">House rules, etc.</p>
                <textarea name="extraInfo" value={form.extraInfo} onChange={handleChange} rows="5" autoComplete="off" />

                <h2 className="text-2xl mt-4">Check In/Out times, Max Guests & Price</h2>
                <p className="text-sm text-gray-800">Add check in/out times. remember to have some time window for cleaning the place between guests. Price per night (in &#8377;)</p>
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input type="text" name="checkIn" value={form.checkIn} onChange={handleChange} placeholder="14:00" required autoComplete="off" pattern="([0-1]{1}[0-9]{1}|20|21|22|23):[0-5]{1}[0-9]{1}" title="24hr format(hh:mm)"/>  
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input type="text" name="checkOut" value={form.checkOut} onChange={handleChange} placeholder="12:00" required autoComplete="off" pattern="([0-1]{1}[0-9]{1}|20|21|22|23):[0-5]{1}[0-9]{1}" title="24hr format(hh:mm)"/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max guests</h3>
                        <input type="number" name="maxGuests" value={form.maxGuests} onChange={handleChange} min="1" max="30" required autoComplete="off"/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night (&#8377;)</h3>
                        <input type="number" name="price" value={form.price} onChange={handleChange} min="0" required autoComplete="off"/>
                    </div>
                </div>

                <button type="submit" className="bg-red-500 text-white w-full my-4 rounded-2xl p-2">Save</button>
            </form>
            {id && <button onClick={handleClick} className="text-white bg-gray-600 w-full mb-2 rounded-2xl p-2">Delete Place</button>}

          <ToastContainer />
        </div> 
    );
}

export default PlacesForm;
