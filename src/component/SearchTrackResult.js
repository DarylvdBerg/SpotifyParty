import "../style/SearchTrack.scss";

export default function SearchTrackResult({track}) {

    function addTrackToPlayList() {
        
    }

    return(
        <div className="search-track-result" onClick={() => {addTrackToPlayList()}}>
            <img className="search-track-image" src={track.album.images[1].url} alt="track"/>
            <h3>{track.name}</h3>
        </div>
    )
}