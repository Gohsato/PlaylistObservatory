import React, { Component } from 'react';


class TrackPoint extends Component {
    constructor() {
        super();
        
    }

    render() {
        const {datum, index } = this.props;
        const mult = 300;
        let x = datum.analysis.danceability*mult;
        let y = datum.analysis.energy*mult;
        return (
            <circle cx={x} cy={y} r={10} onClick={() => { console.log(datum.name); }} />
        );
    }
}

export default TrackPoint;