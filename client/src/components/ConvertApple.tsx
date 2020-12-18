import React from 'react'
import axios from '../shared/axios-client'

const ConvertApple = () => {
   const getSpotifyMe = (): void => {
      axios.get("http://localhost:5000/api/auth/spotify/me")
   }
   return (
      <div>
         convert apple playlists
         <button onClick={getSpotifyMe}>get me</button>
      </div>
   )
}

export default ConvertApple