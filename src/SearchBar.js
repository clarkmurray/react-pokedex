import React from 'react';


export default class SearchBar extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<div className="row pt-3 pb-3 searchRow">
				<div className="col-md-6 offset-md-3 text-center">
					<form onSubmit={this.handleSubmit}>
						<div className="input-group">
							<input className="form-control" placeholder='Search for a Pokemon' ref='searchPokemon' id="searchBar"></input>
							<div className="input-group-append">
								<input type="submit" className="btn btn-primary" value="Search" />
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onSearch(this.refs.searchPokemon.value.toLowerCase());
		this.refs.searchPokemon.value = '';
	}


}