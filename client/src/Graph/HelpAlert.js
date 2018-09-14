import React from 'react';
import { Alert } from 'reactstrap';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { FaHome, FaSyncAlt, FaWrench } from 'react-icons/fa';

class HelpModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div className="infoButton">
                <Button color="info" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>A Quick Tour</ModalHeader>
                    <ModalBody>
                        <p>Click the <FaWrench /> icon to view the legend and the graph settings.</p>
                        <p>The <FaSyncAlt /> generates more recommendations and <FaHome /> centers the graph.</p>

                        <p>Click on the dots to add/remove songs from the playlist.</p>
                    </ModalBody>
                    {/* <ModalFooter>
            <Button color="primary" onClick={this.toggle}>re</Button>{' '}
          </ModalFooter> */}
                </Modal>
            </div>
        );
    }
}

class HelpAlert extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    render() {
        return (
            <div>
                <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss} className="helpAlert">
                    First time here?    <HelpModal buttonLabel="get the tour" />
                </Alert>
                {this.state.visible ? null : <HelpModal buttonLabel="?" />}
            </div>
        );
    }
}

export default HelpAlert;