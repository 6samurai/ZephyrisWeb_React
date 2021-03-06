var React = require('react');
var Highcharts = require('highcharts');

module.exports = React.createClass({
    // When the DOM is ready, create the chart.
	componentDidMount: function () {
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
	},
    //Destroy chart before unmount.
	componentWillUnmount: function () {
		this.chart.destroy();
	},
    // Get Chart object
	getChart: function () {
		return this.chart;
	},
    //Create the div which the chart will be rendered to.
	render: function () {
		return React.createElement('div', { id: this.props.container });
	}
});