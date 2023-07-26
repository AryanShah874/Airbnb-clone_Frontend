import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";

const UserState=(props)=>{
    const [userInfo, setUserInfo]=useState(null);

    const [ready, setReady]=useState(false);        //very important otherwise see what happens on Account Page (refer: 1:50:00)

    useEffect(()=>{
        if(!userInfo){
            fetch("https://airbnb-clone-backend-8i7m.onrender.com/profile", {   //if not useEffect then would have made the function async and const response=await fetch();
                method: "GET", 
                credentials: "include"
            }).then((response)=>{
                return response.json();
            }).then((data)=>{
                setReady(true);
                return setUserInfo(data);
            })
        }
    }, []);

    return(
        <UserContext.Provider value={{userInfo, setUserInfo, ready}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserState;