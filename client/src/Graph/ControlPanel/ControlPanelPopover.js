import React from 'react';
import { Button, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import './ControlPanel.css'

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
            <div>
                <Button id="Popover1" onClick={this.toggle}>
                    {this.props.title}
                </Button>
                <Popover  placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
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