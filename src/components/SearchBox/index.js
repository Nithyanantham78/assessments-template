import React from 'react';
import _ from 'lodash';

export default ({onSearchText,onChangeSearchType})=>{
    
    const sendQuery = (text) => onSearchText(text);
    const delayedQuery = _.debounce(t => sendQuery(t), 500);
    
    return(<div className="dropdown col-6 mb-4 float-right">
                <input className="form-control col-8 float-right" data-testid="search" onChange={(e)=>delayedQuery(e.target.value)} type="text" placeholder="Search.."/>
            <select className="form-control col-4 float-none" data-testid="searchType" onChange={(e)=>onChangeSearchType(e.target.value)}>
                <option value="name">Name</option>
                <option value="code">Code</option>
            </select>
        </div>
       )
}