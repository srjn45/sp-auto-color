import React from "react";

export default class AutoColor extends React.Component {
    constructor(props) {
        super(props);
        this.hexToRgb = this.hexToRgb.bind(this);
        this.state = { color: '#000000', backgroundColor: '#ffffff' }
    }

    componentWillMount() {
        let bg = this.props.backgroundColor;
        let rgb = [];
        let opacity = null;
        if (bg.startsWith('#')) {
            let hex = bg.replace('#', '').trim();
            rgb = this.hexToRgb(hex);
        } else if (bg.startsWith('rgba')) {
            rgb = bg.replace('rgba', '').replace('(', '').replace(')', '').replace(' ', '').split(',');
            opacity = rgb.splice(3)[0];
            rgb = rgb.map(val => parseInt(val));
        } else if (bg.startsWith('rgb')) {
            rgb = bg.replace('rgb', '').replace('(', '').replace(')', '').replace(' ', '').split(',');
            rgb = rgb.map(val => parseInt(val));
        }
        let mean = rgb.reduce((a, b) => a + b, 0) / 3;

        // Experimental work, commented before commit
        // 
        // trying to use standard deviation for better results
        // also may need to handle each color differently
        // 
        // let sd = rgb.map(val => val - mean);
        // console.log(rgb);
        // console.log(sd);
        // console.log(sd.map(val => 0 - val >= 0 ? 0 - val : 0).join(','));
        // console.log(sd.map(val => 255 - val <= 255 ? 255 - val : 255));

        let threshold = this.props.threshold ? this.props.threshold : 128;
        if (opacity != null) {
            threshold = parseInt(threshold * opacity)
        }
        this.setState({ color: mean > threshold ? '#000000' : '#ffffff' });
    }

    // this function is copied from a StackOverflow answer
    hexToRgb(hex) {
        if (hex.length < 6) {
            return { r: 0, g: 0, b: 0 }
        }
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : [];
    }

    render() {
        return (
            <div style={{ color: this.state.color, backgroundColor: this.props.backgroundColor }}>
                {this.props.children}
            </div>
        )
    }
}