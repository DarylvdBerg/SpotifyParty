import axios from "axios";
import "../style/SearchTrack.scss";

export default function SearchTrackResult({track}) {
    const trackPrefix = "spotify:track:";
    function addTrackToPlayList() {
        const content = {
            playlistId: process.env.REACT_APP_PLAYLIST_ID,
            tracks: [trackPrefix+track.id]
        }
        
        axios.post(process.env.REACT_APP_BASE_URL+"track", content)
            .then(response => {
                console.log(response);
            });
    }

    return(
        <div className="search-track-result" onClick={() => {addTrackToPlayList()}}>
            <img className="search-track-image" src={track.album.images[1].url} alt="track"/>
            <h3>{track.name}</h3>
        </div>
    )
}