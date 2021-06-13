import React from 'react'
import './SearchPeople.scss'
import SearchIcon from "@material-ui/icons/Search";

function SearchPeople() {
    return (
        <div className="search"> 
         <SearchIcon className="icon-block"/>
                <input placeholder="search"/>
        </div>
    )
}

export default SearchPeople
