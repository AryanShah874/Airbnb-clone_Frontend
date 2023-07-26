import React, { useContext, useState } from "react";
import {Link, Navigate} from "react-router-dom";
import UserContext from "../context/UserContext";
import { toast } from 'react-toastify';

function Login(){

    const {setUserInfo}=useContext(UserContext);

    const [user, setUser]=useState({username: "", password: ""});

    const [redirect, setRedirect]=useState(false);

    const handleChange=(event)=>{
        setUser({...user, [event.target.name]: event.target.value});
    }
    
    const handleSubmit=async(event)=>{
        event.preventDefault();

        const response=await fetch("http://localhost:5000/login",{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });

        const res=await response.json();

        if(response.ok){
            setUserInfo(res.user);
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
            setRedirect(true);
        }
        else{
            toast.error(res.error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    if(redirect){
        return <Navigate to={"/"}/>
    }

    const handleClick=()=>{
        window.location.href = "http://localhost:5000/auth/google";
    }

    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form method="post" onSubmit={handleSubmit} className="max-w-md mx-auto my-2">
                    <input type="email" name="username" value={user.username} onChange={handleChange} placeholder="your@email.com" required autoComplete="off" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" title="Valid email-id"/>
                    <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="password" required pattern=".{8,}" title="Eight or more characters"/>
                    <button type="submit" className="w-full bg-red-500 text-white p-2 rounded-2xl">Login</button>
                </form>
                <div className="text-center my-4 text-gray-400 text-sm">
                    <span>Or Login with</span>
                </div>
                <button onClick={handleClick} className="w-full bg-red-500 text-white p-2 rounded-2xl"><i className="fa-brands fa-google"></i> Google</button>
                <div className="text-center py-2 text-gray-400">
                    Don't have an account yet? <Link to="/register" className="underline text-black">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;