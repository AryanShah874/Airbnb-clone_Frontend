import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import AccountNav from "./AccountNav";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from 'react-toastify';

function Account(){
    let {userInfo, setUserInfo, ready}=useContext(UserContext);
    const [redirect, setRedirect]=useState('');

    if(!ready){
        setTimeout(()=>{
        }, 1000);
    }

    if(!userInfo && !redirect){
        return <Loader />;
    }

    const handleClick=async()=>{
        const response=await fetch("http://localhost:5000/logout", {
            method: "GET",
            credentials: "include"
        });

        const res=await response.json();

        setUserInfo(null);
        
        toast.success(res.success, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        setRedirect("/");
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return(
        <div>
            <AccountNav />
            
            <div className="text-center max-w-lg mx-auto">
                Logged in as {userInfo.name} ({userInfo.username})
                <br />
                <button onClick={handleClick} className="bg-red-500 text-white max-w-sm w-full py-2 mt-2 rounded-2xl">Logout</button>
            </div>
        </div>
    );
}

export default Account;