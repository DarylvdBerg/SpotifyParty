import React, {useEffect, useState} from 'react'

export default function Login() {
    const [authorizeUrl, setAuthorizeUrl] = useState('');
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch(process.env.REACT_APP_BASE_URL+"authorize")
        .then(response => response.json())
        .then(response => {
            setAuthorizeUrl(response);
            setLoaded(true);
        });
    });
    
    if(!isLoaded) {
        return <div>Loading...</div>
    } 
    else {
        return (
            <div>
                <a href={authorizeUrl}>Login to Spotify</a>
            </div>
        )
    }
}