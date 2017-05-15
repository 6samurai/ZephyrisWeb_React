import React from 'react';
import ReactDOM from 'react-dom';
import Highcharts from 'highcharts';
import Chart from '../highchart/highchart.js';

Highcharts.setOptions({  chart: { type: 'spline',
	animation: Highcharts.svg, // don't animate in old IE
	marginRight: 10
},
	legend: { enabled: false },
	tooltip: { enabled: false },
	plotOptions: {
		spline: {
			marker: { 
				enabled: false,
				states: {
					hover: { enabled: false }
				}
			}
		}
	},
	xAxis: {
		type: 'datetime',
		tickPixelInterval: 150
	},
	yAxis: {
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	}
});

function generateInitialSeriesData () {
    // generate an array of random data
	var data = [],
		now = new Date(),
		time = new Date(now.getTime() - (1000*60*60*24)),
		i;
  
	for (i = -10; i <= 0; i += 1) {
		data.push({
			x: new Date(time.getTime() + 1 * 1000),
			y: 0
		});
	}
	return data;
}

var optionsCPU = {};
optionsCPU.title = { text: 'CPU Usage %' };
optionsCPU.series = [{
	name: 'cpu data',
	data: generateInitialSeriesData()
}];

var optionsRAM = {};
optionsRAM.title = { text: 'RAM Free MB' };
optionsRAM.series = [{
	name: 'ram data',
	data: generateInitialSeriesData()
}];

var optionsPLY = {};
optionsPLY.title = { text: 'Players Connected' };
optionsPLY.series = [{
	name: 'players data',
	data: generateInitialSeriesData()
}];

class ServerGraph extends React.Component {

	constructor (props) {
		super(props);
		this.state = { };
		this.state.optionsCPU = optionsCPU;
		this.state.optionsRAM = optionsRAM;
		this.state.optionsPLY = optionsPLY;

		this.update = this.update.bind(this);
	}  
  
	componentDidMount () {
	}
  
	componentWillUnmount () {
		clearInterval(this.interval);
	}
  
	update(model) {
		var x = new Date(model.ServerTime.replace(' - ', ' ')), // server time
			x1 = new Date(Date.UTC(x.getFullYear(), x.getMonth()+1, x.getDate(), x.getHours(), x.getMinutes(), x.getSeconds())).getTime(),
			y1 = parseFloat(model.ServerCPU),
			y2 = parseFloat(model.ServerRAM),
			y3 = parseFloat(model.ServerPlayers);
    
		this.refs.chartCPU.getChart().series[0].addPoint([x1, y1], true, true);
		this.refs.chartRAM.getChart().series[0].addPoint([x1, y2], true, true);
		this.refs.chartPLY.getChart().series[0].addPoint([x1, y3], true, true);
    
		this.refs.chartCPU.getChart().reflow();
		this.refs.chartRAM.getChart().reflow();
		this.refs.chartPLY.getChart().reflow();
	}
  
	render () {
		return <div className="col-xs-8 panel-body"> 
            <div id="react-chart-CPU" className="col-xs-4">
              <Chart options={this.state.optionsCPU} container="chartCPU" ref="chartCPU" />
            </div>
            <div id="react-chart-RAM" className="col-xs-4">
              <Chart options={this.state.optionsRAM} container="chartRAM" ref="chartRAM" />
            </div>
            <div id="react-chart-PLY" className="col-xs-4">
              <Chart options={this.state.optionsPLY} container="chartPLY" ref="chartPLY" />
            </div>
           </div>;
	}
}

module.exports = ServerGraph;
