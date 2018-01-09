import React from 'react';


export default class SearchBar extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<div className="row">
				<div className="col"></div>
				<div className="col text-center">
					<form onSubmit={this.handleSubmit}>
						<div className="input-group">
							<input className="form-control" placeholder='Search for a Pokemon' ref='searchPokemon'></input>
							<div className="input-group-append">
								<input type="submit" className="btn btn-primary" value="Search" />
							</div>
						</div>
					</form>
				</div>
				<div className="col"></div>
			</div>
		)
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onSearch(this.refs.searchPokemon.value);
		this.refs.searchPokemon.value = '';
	}
}