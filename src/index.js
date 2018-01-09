import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';

import SearchBar from './search.js';
import PokemonResult from './pokemon.js';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = { 
			pokemon: {}
		}
		this.onSearch = this.onSearch.bind(this);
	}

	render() {
		return (
			<div>
				<SearchBar onSearch={this.onSearch} />
				<PokemonResult pokemon={this.state.pokemon} />
			</div>
		)
	}

	onSearch(pokemon) {
		let searchedPokemon = pokemon;
		$.ajax({
			url: 'https://pokeapi.co/api/v2/pokemon/' + searchedPokemon,
			dataType: 'json',
			success: function (data) {
				this.setState({ pokemon: data });
				console.log(data);
			}.bind(this), // make sure to bind the success function in order to set state
			error: function(xhr, status, err) {
				console.log(err);
			}

		});
		
	}


}



ReactDOM.render(<App />, document.getElementById('root'));