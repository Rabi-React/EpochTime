import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './EpochTime.css'

export default function EpochTime(){

    const [epochTime, setEpochTime] = useState(0);
    const [stopWatch, setStopWatch] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        axios.get('https://worldtimeapi.org/api/timezone/Etc/UTC').then(res => {setEpochTime(res.data.unixtime);})
        },[]);

    useEffect(()=>{
        setIsLoading(true);
        const interval = setInterval(()=> axios.get('https://worldtimeapi.org/api/timezone/Etc/UTC').
                                        then(res => {setEpochTime(res.data.unixtime)}), 30000);
                                       
        return ()=> {clearInterval(interval)}
        
     },[epochTime]);

    useEffect(()=> setIsLoading(false),[epochTime]);

    useEffect(()=>{
        const interval = setInterval(()=>{
        let currentTime = Math.round(new Date().getTime() / 1000);
        let difference = currentTime - epochTime;
        let date = new Date(difference * 1000);
        let hh = date.getUTCHours();
        let mm = date.getUTCMinutes();
        let ss = date.getUTCSeconds();
        if (hh < 10) {hh = "0"+hh;}
        if (mm < 10) {mm = "0"+mm;}
        if (ss < 10) {ss = "0"+ss;}
        setStopWatch(`${hh}:${mm}:${ss}`)
        },1000);
        return ()=> {clearInterval(interval)}
    },[stopWatch]);

    return <div>{isLoading ? <div className='loading'>Loading...</div> : 
    <div className='mainDiv'>
        <div className='leftPanel'>
        <div className='timeDisplay'>Most Recently Fetched Time:{epochTime} ms</div>
        <div className='timeDifference'>Time Difference: {stopWatch}</div>
        </div>
    <div className='rightPanel'>Right Panel</div>
    </div>
    }</div>
    
}