import React, { Component } from 'react';
import icon from './search.png';
import './search.css';


class Search extends Component {
    render() {
        return (
            <div className="search">
                <input id="search" type="text" placeholder="Search name" /> 
                <button><img src={icon} className="icon"/></button>
                <div className="search_result"> </div>
            </div>
        );
    }
}

export default Search;