import React, { useState } from "react";
import FilterContext from './FilterContext';

const FilterState=(props)=>{
    const [filter, setFilter]=useState('');

    return(
        <FilterContext.Provider value={{filter, setFilter}}>
            {props.children}
        </FilterContext.Provider>
    );
}

export default FilterState;