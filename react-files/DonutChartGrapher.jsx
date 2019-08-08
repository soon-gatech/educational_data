import React from 'react';
import { PieChart } from 'react-chartkick';
import 'chart.js';

const isMobile = window.innerWidth < 1000;

export class DonutChartGrapher extends React.Component {
    constructor(props) {
        super(props);

        this.callToUpdate = this.callToUpdate.bind(this);
        this.makeGradient = this.makeGradient.bind(this);
    }

    // Not enough built in gradients with chartkick
    // Color gradients to match data set with data swapping
    makeGradient() {
        let low = 0;
        let high = (255*255*255);
        let step = Math.floor(high/(this.props.data.length));
        let colors = [];
    
        // Create gradients
        for (var key in this.props.data) {
            low += step;
            colors.push(
                ('#' + low.toString(16))
            );
        }

        // Shuffle and return
        return colors.sort(
            (a, b) => {
                return (Math.random()-Math.random());
            });
    }

    callToUpdate() {
        this.props.processData()
    }

    render() {
        if ( this.props.processed ) {
            let colors = this.makeGradient();
            if (isMobile) {
                return (
                    <PieChart donut={ true }
                              data={ this.props.data }
                              suffix="%"
                              width='98%'
                              height='400px'
                              legend={ this.props.position }
                              name={ this.props.name }
                              colors={ this.makeGradient() } />
                );
            }
            else {
                return (
                    <PieChart donut={ true } 
                              data={ this.props.data } 
                              suffix="%" 
                              width='98%'
                              height='800px'
                              legend={ this.props.position }
                              name={ this.props.name }
                              colors={ this.makeGradient() }
                              download={ this.props.name + '.png' }
                              />
                );
            }
        }
        else {
            this.callToUpdate();
            return <p>Loading Graph...</p>;
        }
    }
}