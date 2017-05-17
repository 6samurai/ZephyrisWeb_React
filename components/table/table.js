import React from 'react';

var tableStyle = {
	marginTop: '45px'
};

export default class ServerTable extends React.Component {
	constructor (props, context) {
		super(props, context);
		this.state = {serverStatus: {} };
	}
  
	update(model) {
		this.state.serverStatus = model;
		this.forceUpdate();
	}
  
	render () {
		return <div id="server_status" style={tableStyle} className="col-xs-3 panel-body" >
          <table className="table table-bordered table-striped" >
            <tbody id="server-stats">
              <tr>
                <td>Name</td>
                <td> {this.state.serverStatus.ServerName} </td>
              </tr>
              <tr>
                <td>Version</td>
                <td> {this.state.serverStatus.ServerVersion} </td>
              </tr>
              <tr>
                <td>OS</td>
                <td> {this.state.serverStatus.ServerOS} </td>
              </tr>
              <tr>
                <td>Time</td>
                <td> {this.state.serverStatus.ServerTime} </td>
              </tr>
              <tr>
                <td>CPU Usage</td>
                <td> {this.state.serverStatus.ServerCPU} </td>
              </tr>
              <tr>
                <td>RAM Free</td>
                <td> {this.state.serverStatus.ServerRAM} </td>
              </tr>
              <tr>
                <td>Players</td>
                <td> {this.state.serverStatus.ServerPlayers} </td>
              </tr>
            </tbody>
          </table>
        </div>;
	}
}
