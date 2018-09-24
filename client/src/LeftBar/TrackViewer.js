import React from 'react';
import { Button } from 'reactstrap';


class TrackViewer extends React.Component {

    render() {
        const isRecommendation = this.props.selected.id.startsWith("recommended");
        const track = this.props.selected.datum ? this.props.selected.datum : this.props.selected;
        const albumArt = track.album.images[0].url;
        const name = track.name
        return (

            <div id="TrackViewer">
                <div id="Track">
                    <h5>{isRecommendation?"Recommendation:":"Playlist Track:"}</h5>
                    <div><img src={albumArt} style={{ height: 150 }} alt="album art" /></div>
                    <h3>
                        {name}
                    </h3>
                    {isRecommendation ?
                        <Button className="OptionButton" onClick={() => this.props.addTrack(track)}>add track</Button> :
                        <Button className="OptionButton" onClick={() => this.props.removeTrack(track)}>delete</Button>}
                </div>
                <Button id="ExitButton" onClick={() => this.props.exit()}>exit</Button>
            </div>

        )
    }
}
export default TrackViewer;