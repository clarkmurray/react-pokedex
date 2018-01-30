import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';


class SearchBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			searchedPokemon: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row pt-3 pb-3 searchRow">
					<div className="col-md-3 col-xs text-center">
						<Link to="/"><h4 id="appTitle">React Pokedex</h4></Link>
					</div>
					<div className="col-md-9 col-xs text-center">
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
			</div>
		)
	}

	handleSubmit(event) {
		event.preventDefault();
		let searchedPokemon = this.refs.searchPokemon.value;
		this.refs.searchPokemon.value = '';
		console.log(this.props);
		this.props.history.push(`/${searchedPokemon}`);
	}


}

export default withRouter(SearchBar);