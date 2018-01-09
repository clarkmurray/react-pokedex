import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';

import SearchBar from './SearchBar';
import PokemonResult from './PokemonResult';
import LoadingSpinner from './LoadingSpinner';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = { 
			pokemon: '',
			weight: 0,
			url: '',
			id: null,
			types: [],
			isLoading: false
		}
		this.onSearch = this.onSearch.bind(this);
	}

	render() {
		return (
			<div>
				<SearchBar onSearch={this.onSearch} />
				{!this.state.isLoading && <PokemonResult pokemon={this.state.pokemon} weight={this.state.weight} url={this.state.url} id={this.state.id} types={this.state.types} />}
				{this.state.isLoading && <LoadingSpinner />}
			</div>
		)
	}

	onSearch(pokemon) {
		let searchedPokemon = pokemon;
		this.setState({ isLoading: true });
		$.ajax({
			url: 'https://pokeapi.co/api/v2/pokemon/' + searchedPokemon,
			dataType: 'json',
			success: function (data) {
				this.setState({ 
					pokemon: data.name,
					weight: data.weight,
					url: data.sprites.front_default,
					id: data.id,
					types: data.types.map(function(type) {
						return type.type.name;
					}),
					isLoading: false
				});
				console.log(data);
				console.log(this.state.types);
			}.bind(this), // make sure to bind the success function in order to set state
			error: function(xhr, status, err) {
				console.log(err);
			}

		});
		
	}


}



ReactDOM.render(<App />, document.getElementById('root'));