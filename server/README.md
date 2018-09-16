## To Start the server
1. 'npm install'
1. Create a Spotify app at developer.spotify.com  
Here's a handy guide that I used (a lot):  
https://medium.com/@jonnykalambay/now-playing-using-spotifys-awesome-api-with-react-7db8173a7b13
1. Make a file in the '/server' directory called '.env' and fill it with this  
```
    CLIENT_ID = <clientID>
    CLIENT_SECRET = <clientSecret>
    REDIRECT_URI = http://localhost:8888/callback/
    NODE_ENV = development
    PORT=8888
```
4. run 'node ./app.js'





The server is basically the implementation provided here:
https://developer.spotify.com/web-api/authorization-guide/
