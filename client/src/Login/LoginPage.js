import React from 'react';
import { Button, Jumbotron } from 'reactstrap';



export default class LoginPage extends React.Component {

    render() {

        return (
            <div >
                <Jumbotron>

                    <h1>Hi, this my app</h1>
                    <p>click button have fun</p>

                    <Button onClick={this.props.login}>Start</Button>
                </Jumbotron>
            </div>
        )
    }
}

