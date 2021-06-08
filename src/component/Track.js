import "../style/Track.scss";

export default function Track({track}) {
    const trackInfo = track.track;

    function MillisecondsToMinutes(ms) {
        let min = Math.floor((ms / 1000 / 60) << 0)
        let sec = Math.floor((ms/1000) % 60)
        return min + ":" + sec;
    }

    return (
        <div className="track-item">
            <img className="track-image" src={trackInfo.album.images[1].url} alt="Album"/>
            <div className="track-information">
                <h3>{trackInfo.name}</h3>
                <p>duration: {MillisecondsToMinutes(trackInfo.duration_ms)}</p>
                <p>Popularity: {trackInfo.popularity} / 100</p>
            </div>
        </div>
    )
}