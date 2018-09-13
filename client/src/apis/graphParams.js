
export var AXIS_UNITS = {
    energy:"energy",
    danceability:"danceability",
    speechiness:"speechiness",
    acousticness:"acousticness",
    instrumentalness:"instrumentalness",
    liveness:"liveness",
    valence:"valence",
    
}

export function Axis(unit) {
    this.name = unit;
    this.dataFunction = (d)=>d.analysis[unit] * 100;
}

