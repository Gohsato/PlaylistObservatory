import React from 'react';
import { FaHome, FaSyncAlt, FaWrench } from 'react-icons/fa';
import { Button } from 'reactstrap';
import ControlPanel from './ControlPanel/ControlPanel';
import ControlPanelPopover from './ControlPanel/ControlPanelPopover';

export default function CornerButtons(props){
    return (
        <div id="CornerButtons">
        <ControlPanelPopover title={<FaWrench />}>
            <ControlPanel dataFields={props.dataFields} onChange={props.setDataFields}
                updateRecommendations={props.updateRecommendations} graphRef={props.forwardedRef} />
        </ControlPanelPopover>
        <div><Button onClick={props.updateRecommendations}><FaSyncAlt /></Button></div>
        {props.forwardedRef.current ?
            <div><Button onClick={props.forwardedRef.current.setSelected}><FaHome /></Button></div> :
            null}
    </div>
    )
}