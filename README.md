# The Playlist Obeservatory
This is a web app that takes the tracks off a spotify playlist and visually maps them in 2D space

Here's a live demo : https://gohsato.github.io/PlaylistObservatory/

To run this app locally:  
1. Create a Spotify Web App https://developer.spotify.com/dashboard
2. In the app settings make sure to add `http://localhost:3000/` as a redirect
3. Create an .env file with the following properties
```
REACT_APP_SPOTIFY_CLIENT_ID = <Spotify API ID from dashboard>
REACT_APP_REDIRECT_URI = http://localhost:3000/
```
4. Run the client by going into the '/client' directory and executing 'npm install' then 'npm run start'

Make sure that the React app is run on localhost:3000

## Here's what it looks like  
The gray dots are tracks already on the playlist  
The orange dots are recommendations

<p align="center">
<b>Change the axis </b>
  <img src="demo_gifs/axis_demo.gif"/>
<br>
<b>Add/Remove a track </b>
  <img src="demo_gifs/add_demo.gif"/>

</p>



