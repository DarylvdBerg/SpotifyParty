import React, {useState, useEffect} from 'react';
import "../style/SearchTrack.scss";
import SearchTrackResult from "../component/SearchTrackResult";

export default function SearchTrack() {
    let [search, setSearch] = useState("");
    let [trackList, setTracks] = useState([]);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            if(search !== ""){ 
                fetch("http://localhost:3001/tracks/"+search)
                .then(res => res.json())  
                .then(res => {
                    setTracks(res.tracks.items);
                })          
            } else {
                setTracks([]);
            }
        }, 1000)
        return () => clearTimeout(timer)
      }, [search])

    function addTrackToPlayList(track) {
        console.log(track);
    }

    return(
        <div className="search-box">
            <div>
                <input type="text" 
                placeholder="Search a song to add"
                value={search}
                onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className="search-results">
                {trackList.map((track, index) => (
                    <SearchTrackResult key={index} track={track}/>
                ))}
            </div>
        </div>
    )
}