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
			height: 0,
			weight: 0,
			url: '',
			id: null,
			types: [],
			abilities: [],
			category: '',
			entry: '',
			baseStage: '',
			secondStage: [],
			thirdStage: [],
			isLoading: false
		}
		this.onSearch = this.onSearch.bind(this);
	}

	render() {
		return (
			<div>
				<div className="col text-center">
					<h1>React Pokedex</h1>
				</div>
				<SearchBar onSearch={this.onSearch} />
				{!this.state.isLoading && <PokemonResult pokemon={this.state.pokemon} height={this.state.height} weight={this.state.weight} url={this.state.url} id={this.state.id} types={this.state.types} entry={this.state.entry} abilities={this.state.abilities} category={this.state.category} baseStage={this.state.baseStage} secondStage={this.state.secondStage} thirdStage={this.state.thirdStage} />}
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
				$.ajax({
					url: 'https://pokeapi.co/api/v2/pokemon-species/' + searchedPokemon,
					dataType: 'json',
					success: function (data) {
						console.log(data);
						let flavorText;
						let genus;
						for (let i=0; i < data.flavor_text_entries.length; i++) {
							if (data.flavor_text_entries[i].language.name === 'en') {
								flavorText = data.flavor_text_entries[i].flavor_text;
								break;
							}
						}
						console.log("The flavor text is " + flavorText);
						for (let i=0; i < data.genera.length; i++) {
							if (data.genera[i].language.name === 'en') {
								genus = data.genera[i].genus;
								break;
							}
						}
						this.setState({
							entry: flavorText,
							category: genus
						});
						let evolutionURL = data.evolution_chain.url;
						$.ajax({
							url: evolutionURL,
							dataType: 'json',
							success: function (data) {
								let base = data.chain.species.name;
								let evolutions = [];
								let thirdStage = [];
								if (data.chain.evolves_to.length) {
									for (let i=0; i < data.chain.evolves_to.length; i++) {
										evolutions.push(data.chain.evolves_to[i].species.name);
										if (data.chain.evolves_to[i].evolves_to.length){
											for (let j=0; j < data.chain.evolves_to[i].evolves_to.length; j++) {
												thirdStage.push(data.chain.evolves_to[i].evolves_to[j].species.name);
											}
										}
									}
								}
								console.log(data.chain);
								console.log(base, evolutions, thirdStage);
								this.setState({
									baseStage: base,
									secondStage: evolutions,
									thirdStage: thirdStage
								})
							}.bind(this), // make sure to bind the success function in order to set state
							error: function(xhr, status, err) {
								console.log(err);
							}
						});
					}.bind(this), // make sure to bind the success function in order to set state
					error: function(xhr, status, err) {
						console.log(err);
					}

				});
				this.setState({ 
					pokemon: data.name,
					height: data.height,
					weight: data.weight,
					url: data.sprites.front_default,
					id: data.id,
					types: data.types.map(function(type) {
						return type.type.name;
					}),
					abilities: data.abilities.map(function(ability){
						return ability.ability.name;
					}),
					entry: null,
					isLoading: false
				});
				console.log(data);
			}.bind(this), // make sure to bind the success function in order to set state
			error: function(xhr, status, err) {
				console.log(err);
			}

		});
		
	}


}



ReactDOM.render(<App />, document.getElementById('root'));