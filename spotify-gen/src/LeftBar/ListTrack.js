import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, ButtonGroup, Popover, PopoverBody } from 'reactstrap';
import './LeftBar.css';

export default class ListTrack extends React.Component {
    constructor() {
        super();
        this.state = {
            popoverOpen: false
        }

        this.toggle = this.toggle.bind(this);

    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    render() {
        const name = this.props.track.name;
        const artist = this.props.track.artists[0].name;
        return (
            <div className="PlaylistEntry">
                <p>{this.props.i + 1}.</p>
                <div className="PlaylistEntryTitle">
                    <h1 className="ellipse">{name}</h1>
                    <h2 className="ellipse">{artist}</h2>
                </div>
                <div className="navBar" id={"Popover2" + this.props.i} onClick={this.toggle}></div>
                <Popover target={"Popover2" + this.props.i} placement="bottom" isOpen={this.state.popoverOpen} toggle={this.toggle}>
                    <PopoverBody>
                        <ButtonGroup vertical>
                            <Button color="danger" onClick={() => this.props.removeSong(this.props.track)}>Delete Song</Button>
                            <Button onClick={() => this.props.pointSelect(this.props.track)}>Select Song</Button>
                        </ButtonGroup>
                    </PopoverBody>
                </Popover>

            </div>
        )
    }
}