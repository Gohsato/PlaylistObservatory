import React from 'react';
import PlaylistViewer from './PlaylistViewer';
import TrackViewer from './TrackViewer';

export default function LeftBar(props){
        let leftSide;
        if (props.selected) {
            leftSide = 
                <TrackViewer 
                    exit={props.pointSelect}
                    removeTrack={props.removeTrack}
                    addTrack={props.addTrack}
                    selected={props.selected} />;
        }
        else {
            leftSide = 
                <PlaylistViewer
                    graphData={props.graphData} 
                    removeSong={props.removeTrack} 
                    pointSelect={props.pointSelect}/>;
        }
        return <div id="LeftBar">
            {leftSide}
        </div>;
}