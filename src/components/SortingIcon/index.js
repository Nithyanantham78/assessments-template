import React from 'react';

export default ({active,asc,sortingOnClick})=>{

    return asc?<svg onClick={()=>sortingOnClick(false)} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up" fill={`${active?'currentColor':'#bbb'}`} xmlns="http://www.w3.org/2000/svg" style={{cursor:"pointer"}}>
    <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
    <path fillRule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 3.707 5.354 6.354a.5.5 0 1 1-.708-.708l3-3z"/>
    </svg>:<svg onClick={()=>sortingOnClick(true)} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down" fill={`${active?'currentColor':'#bbb'}`} xmlns="http://www.w3.org/2000/svg" style={{cursor:"pointer"}}>
    <path fillRule="evenodd" d="M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
    <path fillRule="evenodd" d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"/>
    </svg>;
}