import React, {Component, PropTypes} from 'react';
import Highcharts from 'highcharts';

export default class HighChartComponent extends Component{
    

      static PropTypes = {
        modules: PropTypes.object,
        container: PropTypes.object,
        options: PropTypes.object
    }

	constructor(props){
		super(props);
		this.chart;
	}

	componentDidMount () {
        // Extend Highcharts with modules
		if (this.props.modules) {
			this.props.modules.forEach(function (module) {
				module(Highcharts);
			});
		}
        // Set container which the chart should render to.
		this.chart = new Highcharts[this.props.type || 'Chart'](
            this.props.container, 
            this.props.options
        );
	}

	componentWillUnmount () {
		this.chart.destroy();
	}

	getChart () {
		return this.chart;
	}

	render(){
		return(
            <div id={this.props.container}>
                </div>  
		);
	}
}