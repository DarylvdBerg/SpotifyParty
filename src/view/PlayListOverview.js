import React from 'react';
import axios from 'axios';
import "../style/PlaylistOverview.scss";
import Track from "../component/Track";
import SearchTrack from "../component/SearchTrack";

class PlayListOverview extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isLoaded: false,
            playList: null
        };
    }

    componentDidMount() {
        this.getPlayList();
        this.loginToSpotify(this.props.code);
    }

    loginToSpotify(code) {
        axios.post(process.env.REACT_APP_BASE_URL+"login", {code})
        .then(res => {
            console.log("executed");
            window.history.pushState({}, "", "/")
        })
        .catch(() => {
            window.location = "/";
        })
    }

    getPlayList() {
        fetch(process.env.REACT_APP_BASE_URL+"playlist")
        .then(res => res.json())
        .then(res => {
            this.setState({
                isLoaded: true,
                playList: res,
            })
        })
    }


    render() {
        const {isLoaded, playList} = this.state;
        if(!isLoaded){
            return (<p>Is loading...</p>)
        }
        else{
            let tracks = playList.tracks.items;
            return (
                <div className="container">
                    <h1>{playList.name}</h1>
                
                    <SearchTrack/>
                    <div className="track-list"> 
                        {tracks.map((track, index) => (
                            <Track key={index} track={track}/>
                        ))}
                    </div>
                </div>
            )
        }
    }
}
export default PlayListOverview;