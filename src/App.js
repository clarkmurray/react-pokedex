import React from 'react';
import $ from 'jquery';

import SearchBar from './SearchBar';
import Home from './Home';
import Result from './Result';


import { Route } from 'react-router-dom';

export default class App extends React.Component {

	constructor(props){
		super(props);
		this.toggleLoading = this.toggleLoading.bind(this);
		this.searchSuccess = this.searchSuccess.bind(this);
		this.state = { 
			searchFailed: false,
			loading: true
		}
	}

	render() {
		return (
			<div>
				<SearchBar toggleLoading={this.toggleLoading} />
				<div className="container">
					<Route exact path="/" render={(props) => (<Home loading={this.state.loading} toggleLoading = {this.toggleLoading} />)} searchFailed={this.state.searchFailed} />
					<Route path="/:name" render={routeProps => (<Result {...routeProps} loading={this.state.loading} toggleLoading = {this.toggleLoading} searchFailed={this.state.searchFailed} searchSuccess={this.searchSuccess} /> )} />
				</div>
			</div>
		)
	}

	toggleLoading(bool) {
		this.setState({
			loading: bool
		});
	}

	searchSuccess(bool) {
		console.log("searchSuccess method entered");
		this.setState({
			searchFailed: bool
		});
	
	}
	
}