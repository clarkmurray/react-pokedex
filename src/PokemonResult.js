import React from 'react';
import EvolutionChain from './EvolutionChain';


export default class PokemonResult extends React.Component {
	constructor(props){
		super(props);
		this.convertHeight = this.convertHeight.bind(this);
		this.convertWeight = this.convertWeight.bind(this);
		this.joinArray = this.joinArray.bind(this);
		this.capitalizeItems = this.capitalizeItems.bind(this);
	}

	render() {
		const query = this.props.pokemon;
		const imgSrc = 'https://img.pokemondb.net/artwork/' + this.props.pokemon.toLowerCase() + '.jpg';
		if (query) {
			return (
				<div>
					<div className="row mt-4">
						<div className="col text-center">
							<h1>{this.props.pokemon.toUpperCase()} (#{this.props.id})</h1>
							<h4>{this.props.category}</h4>
						</div>
					</div>
					<div className="row mt-1">
						<div className="col text-center">
							<p>Types: {this.joinArray(this.props.types)}</p>
						</div>
						<div className="col text-center">
							<p>Abilities: {this.joinArray(this.props.abilities)}</p>
						</div>
					</div>
					<div className="row mt-1">
						<div className="col text-center">
							<p>Height: {this.convertHeight(this.props.height)}"</p>
						</div>
						<div className="col text-center">
							<p>Weight: {this.convertWeight(this.props.weight)}lb</p>
						</div>
					</div>
					<div className="row mt-4 d-flex">
						<div className="col-lg-6 text-center order-lg-last">
							<img src={imgSrc} alt="Sprite" className="align-middle"/>
						</div>
						<div className="col-lg-6 order-lg-first">
							<p>{this.props.entry}</p>
						</div>
					</div>
					<EvolutionChain evolutions={this.props.evolutions} capitalizeItems={this.capitalizeItems} />
				</div>
			)
		} else {
			return <div></div>
		}
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