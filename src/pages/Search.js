import React, { useContext, useState } from 'react'
import FilterContext from '../context/FilterContext';

function Search() {
    const [search, setSearch]=useState(false);

    const [filters, setFilters]=useState({place: '', checkIn: '', checkOut: '', guests: ''});

    const {setFilter}=useContext(FilterContext);

    const handleChange=(event)=>{
        if(event.target.name==='place'){
            event.target.value=event.target.value.toLowerCase();
        }
        setFilters({...filters, [event.target.name]: event.target.value});
    }

    const handleClick=()=>{
        setSearch(false);
        setFilter(filters);
    }

    const clearFilter=()=>{
        setFilters({place: '', checkIn: '', checkOut: '', guests: ''});
        setFilter(filters);
    }

    if(search){
        return(
            <div>
                <div onClick={()=>{setSearch(false);}} className='fixed left-0 right-0 top-0 bottom-0 bg-slate-400 bg-opacity-80'></div>

                <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl'>
                    <i onClick={()=>{setSearch(false)}} className="fa-solid fa-xmark absolute top-1.5 right-1.5 text-red-500 bg-white border border-red-500 py-0.5 px-1 rounded-full cursor-pointer"></i>
                
                    <div className='text-center'>
                        <input type="search" name="place" value={filters.place} onChange={handleChange} placeholder='Search Place' />

                        <div className='flex gap-10 items-center py-4'>
                            <label className='text-gray-500'>Check&nbsp;In: </label>
                            <input type="date" name="checkIn" value={filters.checkIn} onChange={handleChange} min={new Date().toJSON().slice(0, 10)} className='w-full border my-1 py-2 px-3 rounded-2xl'/>
                        </div>

                        <div className='flex gap-7 items-center py-4'>
                            <label className='text-gray-500'>Check&nbsp;Out: </label>
                            <input type="date" name="checkOut" value={filters.checkOut} onChange={handleChange} min={new Date().toJSON().slice(0, 10)} className='w-full border my-1 py-2 px-3 rounded-2xl'/>
                        </div>

                        <input type="number" name="guests" value={filters.guests} onChange={handleChange} min={1} placeholder='Guests' />

                        <div className='flex gap-4'>
                            <button onClick={clearFilter} className='w-full border-2 border-gray-500 text-gray-500 p-2 rounded-xl mt-4'><i className="fa-solid fa-trash fa-sm"></i> Clear Filter</button>
                            <button onClick={handleClick} className='w-full border-2 border-red-500 text-red-500 p-2 rounded-xl mt-4'><i className="fa-solid fa-magnifying-glass fa-sm"></i> Filter</button>
                        </div>
                    </div>
                </div>
            </div>  
        );
    }

    return (
        <div onClick={()=>{setSearch(true)}} className="flex gap-3 border border-gray-300 rounded-full px-4 py-2 shadow-md shadow-gray-300 cursor-pointer">
            <div className="self-center">Anywhere</div>
            <div className="border-l border-gray-300"></div>
            <div className="self-center">Any week</div>
            <div className="border-l border-gray-300"></div>
            <div className="font-light self-center">Add guests</div>
            <div className="h-8 w-8 text-white text-center bg-red-500 border rounded-full p-0.5">
                <i className="fa-solid fa-magnifying-glass fa-sm"></i>
            </div>
        </div>
    );

}

export default Search;