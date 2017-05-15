import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import ServerTable from './table/table.js';
import ServerGraph from './graph/graph.js';

export default class Parent extends Component{

	constructor (props) {
		super(props);
		this.getServerStatus = this.getServerStatus.bind(this);
	}

	getServerStatus () {

		var ctx = this;
		jQuery.ajax({ 
			type: 'GET',
			dataType: 'jsonp',
			jsonpCallback: 'statusCallback',
			url: 'http://178.62.42.250:8080/api/perfmon',
			success: function( response ) {
			//	alert('in success');
				ctx.refs.serverGraph.update(response);
				ctx.refs.serverTable.update(response);
				return response;
			}
		});
	}

	componentDidMount () {
		this.interval = setInterval(this.getServerStatus, 1000);
	}

	componentWillUnmount () {
		clearInterval(this.interval);
	}
	render () {
		return (
       <div>
          <ServerTable ref="serverTable" />
          <ServerGraph ref="serverGraph" />
          <h1>Hello world </h1>
      </div>

		); 
	}
}
 