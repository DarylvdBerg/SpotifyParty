import "../style/SearchTrack.scss";

export default function SearchTrackResult({track}) {

    function addTrackToPlayList() {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                process.env.REACT_APP_PLAYLIST_ID)
        };  
        fetch(process.env.REACT_APP_BASE_URL+"track", options)
    }

    return(
        <div className="search-track-result" onClick={() => {addTrackToPlayList()}}>
            <img className="search-track-image" src={track.album.images[1].url} alt="track"/>
            <h3>{track.name}</h3>
        </div>
    )
}