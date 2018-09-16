import React from 'react';
import './Graph.css';

//https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript
function getTextWidth(text, font) {
  // re-use canvas object for better performance
  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}

class TrackHoverDetails extends React.Component{
  constructor(){
    super();
    this.state={
      hidden:"hidden"
    }
  }

  componentDidMount(){
    this.delay = setTimeout(()=>{
      this.setState({
        hidden:""
      })
    },550)
  }
  componentWillUnmount(){
    clearTimeout(this.delay);
  }

  render(){
      let { x, y} = this.props;
      const {datum} = this.props;
      const imageLink = datum.album.images[0].url
  
      const trackName = datum.name;
      const artistName = datum.artists[0].name;
  
      let width = 0;
  
  
      if (datum._x > 40) {
        x=x-15;
        width = Math.max(getTextWidth(trackName, "bold 18px arial"), getTextWidth(artistName, "bold 15px arial")) + 3 + 100;
      }
  
  
      return (
        <foreignObject x={x} y={y} width="400" height="400" transform={"translate(-" + width + ")"} >
          <div id="TrackHoverDetail" className={this.state.hidden}>
            <img src={imageLink} style={{ height: 100 }} alt="album art" />
            <div>
              <h1>{trackName}</h1>
              <h2>{artistName}</h2>
            </div>
          </div>
        </foreignObject>
      );
  
  }
}

export default TrackHoverDetails;