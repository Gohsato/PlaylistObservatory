import React from 'react';
import { Button } from 'reactstrap';
import { Textfit } from 'react-textfit';

class TrackViewer extends React.Component {

    render() {
        const isRecommendation = this.props.selected.id.startsWith("recommended");
        const track = this.props.selected.datum;
        const albumArt = track.album.images[0].url;
        const name = track.name
        return (
            <div id="TrackViewer">
                <div id="Track">
                    <div><img src={albumArt} style={{ height: 150 }} alt="album art" /></div>
                    <Textfit mode="single" min={15} max={35}>
                        {name}
                    </Textfit>
                    {isRecommendation ?
                        <Button className="OptionButton" onClick={() => this.props.addTrack(track)}>add track</Button> :
                        <Button className="OptionButton" onClick={() => this.props.removeTrack(track)}>delete</Button>}
                </div>
                <Button id="ExitButton" onClick={this.props.exit}>exit</Button>
            </div>
        )
    }
}
export default TrackViewer;