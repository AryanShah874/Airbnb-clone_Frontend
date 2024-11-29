import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import FilterContext from "../context/FilterContext";

function Home(){

    const [places, setPlaces]=useState([]);

    const [loading, setLoading]=useState(false);

    const {filter}=useContext(FilterContext);

    useEffect(()=>{
        fetch("https://airbnb-clone-backend-one.vercel.app/allPlaces" , {
            method: 'GET'
        })
        .then((response)=>{
            return response.json()})
        .then((data)=>{
            setLoading(true);
            if(filter){
                let filteredData=data.filter((place)=>{
                    return place.name.toLowerCase().includes(filter.place)||place.address.toLowerCase().includes(filter.place);
                });

                filteredData=filteredData.filter((place)=>{
                    return place.maxGuests>=filter.guests;
                })

                return setPlaces(filteredData);
            }
            else{
                return setPlaces(data);
            }
        })
    }, [filter]);


    if(!loading){
        return <Loader />
    }

    let noofrows=places.length/3, j=0;
    for(let i=0; i<noofrows; i++){
        console.log(places[j]);
        j++;
        console.log(places[j]);
        j++;
        console.log(places[j]);
        j++;
        //br

        if(i===noofrows-1){
            for(let k=j; k<places.length; k++){
                console.log(places[j]);
                j++;
            }
        }
    }

    // for(let i=0; i<places.length%3; i++){
    //     console.log(places[j]);
    // }


    return(
        <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 mb-16">
            {places.length>0 ? places.map((place, index)=>{
                return(
                    <Link to={"/place/"+place._id} key={index}>

                        <div className="bg-gray-500 rounded-2xl mb-2">
                            {place.photos?.[0] && (                     //.? => means it may or may not exists.
                                <img src={place.photos?.[0]} alt={"photo "+index} className="h-full w-full aspect-square object-cover rounded-2xl"/>
                            )}
                        </div>
                        
                        <h3 className="text-md font-semibold">{place.address}</h3>
                        <h2 className="text-md text-gray-500">{place.name}</h2>

                        <div className="mt-1">
                            <span className="font-semibold">&#8377;{place.price}</span> per night
                        </div>
                    </Link>
                );
            }) : "No place Found."}
        </div>
    );
}

export default Home;