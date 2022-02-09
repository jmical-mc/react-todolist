import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NotFound() {
    
    let { pathname } = useLocation();
    let navigate = useNavigate();
    
    const [counter, setCounter] = useState(10) //this.state, this.setState

    const [stateIntervalId, setIntervalId] = useState(0);

    const countdown = () => setCounter(counter - 1);

    useEffect(() => {
        const intervalId = setInterval(countdown, 1000); 
        setIntervalId(intervalId)
        
        if(counter === 0){
            navigate('/');
        }

        return () => {
            clearInterval(stateIntervalId)
        }
    }, [counter]);

    return (
        <div>
            <p>
                No match for <code>{ pathname }</code>
            </p>
            <p>Redirect to homepage in { counter } seconds</p>
        </div>
    )
}