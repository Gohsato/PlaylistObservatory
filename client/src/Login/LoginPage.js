import React from 'react';
import { Button, Jumbotron } from 'reactstrap';
import './LoginPage.css';


export default class LoginPage extends React.Component {

    render() {

        return (
            <Jumbotron id="LoginPage">

                    <h1>Playlist Obsevatory</h1>

                    <p className="Subtitle">This is an app maps the tracks of a playlist into 2D space based on the properties of the track</p>
                    <hr/>
                    <p>You will <b>need 2 things</b> to use this app: A <b>Spotify Premium account</b> and <b>one playlist</b> you would like to edit</p>
                    <Button onClick={this.props.login}>Start</Button>
                </Jumbotron>
        )
    }
}

