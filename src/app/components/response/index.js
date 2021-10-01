import React, { useState } from 'react';
import './index.css';

function clickToCopy(props){
    if(!props.success) return;
    navigator.clipboard.writeText(props.shortUrl.message);
  }


function Response (props) {
    return (
        <>
            <div className={`boxed ${props.success && "click"}`} onClick={() => clickToCopy(props)}>
              <p>Response <span className={props.success ? "success" : "failed"}>({props.shortUrl.status})</span>:</p>
              <p>{props.shortUrl.message}</p>
              {props.success && <p className="subText">(Click to copy)</p>}
            </div>
  
            <button className="btn" onClick={() => props.clearState()}>Shorten Another!</button>
        </>
    )
}

export default Response;
