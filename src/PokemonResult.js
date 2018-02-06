import React from 'react';
import EvolutionChain from './EvolutionChain';
import { Route } from 'react-router-dom';
import $ from 'jquery';


export default class PokemonResult extends React.Component {
	constructor(props){
		super(props);
		this.convertHeight = this.convertHeight.bind(this);
		this.convertWeight = this.convertWeight.bind(this);
		this.joinArray = this.joinArray.bind(this);
		this.capitalizeItems = this.capitalizeItems.bind(this);
		this.ajaxCalls = this.ajaxCalls.bind(this);
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
			evolutions: [],
		}
	}

	render() {
		const imgSrc = 'https://img.pokemondb.net/artwork/' + this.state.pokemon.toLowerCase() + '.jpg';
		return (
			<div className="mt-4">
			<div className="mainResult">
				<div className="row">
					<div className="col-lg-8 offset-lg-2 text-center pokemonName p-3">
						<h2>{this.state.pokemon.toUpperCase()} (#{this.state.id})</h2>
						<h4>{this.state.category}</h4>
					</div>
				</div>
				<div className="row d-flex">
					<div className="col-lg-4 text-center order-lg-last p-3">
						<img src={imgSrc} alt="Sprite" className="align-middle sugimori"/>
					</div>
					<div className="col-lg-4 offset-lg-2 order-lg-first">
						<div className="basicInfo pt-3">
							<div className="text-center">
								<p>Types: {this.joinArray(this.state.types)}</p>
								<p>Abilities: {this.joinArray(this.state.abilities)}</p>
								<div className="row text-center">
									<div className="col">
										<p>Height: {this.convertHeight(this.state.height)}"</p>
									</div>
									<div className="col">
										<p>Weight: {this.convertWeight(this.state.weight)}lb</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flavorText p-3">
							<p>{this.state.entry}</p>
						</div>
					</div>
				</div>
			</div>
			</div>
		)
	}

	componentDidMount() {
		this.ajaxCalls(this.props.match.params.name);
	}

	componentWillReceiveProps(nextProps) {
		this.ajaxCalls(nextProps.match.params.name);
	}

	ajaxCalls(search) {
		let searchedPokemon = search;
		if  (searchedPokemon === 'smudge') {
			return this.setState({
				pokemon: 'Smudge',
				height: 0,
				weight: 0,
				id: 0,
				types: ['Cat'],
				entry: 'A cute cat',
				abilities: ['Napping'],
				category: 'Fluffy butt',
				evolutions: ['Smudge']
			})
		}
		$.ajax({
			url: 'https://pokeapi.co/api/v2/pokemon/' + searchedPokemon,
			dataType: 'json',
			success: function (data) {
				$.ajax({
					url: 'https://pokeapi.co/api/v2/pokemon-species/' + searchedPokemon,
					dataType: 'json',
					success: function (data) {
						let flavorText;
						let genus;
						for (let i=0; i < data.flavor_text_entries.length; i++) {
							if (data.flavor_text_entries[i].language.name === 'en') {
								flavorText = data.flavor_text_entries[i].flavor_text;
								break;
							}
						}
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
								if (data.chain.evolves_to.length) {
									for (let i=0; i < data.chain.evolves_to.length; i++) {
										if (data.chain.evolves_to[i].evolves_to.length){ 
											for (let j=0; j < data.chain.evolves_to[i].evolves_to.length; j++) {
												let evolutionChain = [base, data.chain.evolves_to[i].species.name, data.chain.evolves_to[i].evolves_to[j].species.name];
												evolutions.push(evolutionChain);
											}
										} else {
											let evolutionChain = [base, data.chain.evolves_to[i].species.name];
											evolutions.push(evolutionChain);
										}
									}
								} else {
									evolutions.push(base);
								}
								this.setState({
									evolutions: evolutions,
									isLoading: false
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
					searchFailed: false
				});
			}.bind(this), // make sure to bind the success function in order to set state
		});
	}

	convertHeight(apiHeight) {
		let height = apiHeight/10;
		let realFeet = ((height * 39.3701) / 12);
		let feet = Math.floor(realFeet);
		let inches = Math.round((realFeet - feet) * 12);
		if (inches === 12) {
			inches = 0;
			feet = feet + 1;
		}
		height = feet + '\'' + inches;
		return height;
	}

	convertWeight(apiWeight) {
		let weight = apiWeight/10;
		weight = weight.toFixed(1);
		weight = weight * 2.20462;
		weight = Math.round(weight * 10)/10;
		return weight;
	}

	joinArray(array) {
		this.capitalizeItems(array);
		array = array.join(", ");
		return array;
	}

	capitalizeItems(array) {
		if (typeof array === "string"){
			array = array.charAt(0).toUpperCase() + array.substr(1);
			return array;
		}
		for (let i = 0; i < array.length; i++) {
			array[i] = array[i].charAt(0).toUpperCase() + array[i].substr(1);
		}
		return array;
	}
}