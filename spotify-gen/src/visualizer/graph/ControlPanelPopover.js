import React from 'react';
import { Button, Popover, PopoverBody, PopoverHeader } from 'reactstrap';


class ControlPanelPopover extends React.Component {
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
        return (
            <div id="Popover">
                <Button id="Popover1" onClick={this.toggle}>
                    GraphStuff
                </Button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                    <PopoverHeader>Graph Settings</PopoverHeader>
                    <PopoverBody>
                        {this.props.children}
                    </PopoverBody>
                </Popover>
            </div>
        )
    }
}

export default ControlPanelPopover;