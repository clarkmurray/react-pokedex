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
	}

	render() {
		const imgSrc = 'https://img.pokemondb.net/artwork/' + this.props.pokemon.toLowerCase() + '.jpg';
		return (
			<div className="mt-4">
			<div className="mainResult">
				<div className="row">
					<div className="col-lg-8 offset-lg-2 text-center pokemonName p-3">
						<h2>{this.props.pokemon.toUpperCase()} (#{this.props.id})</h2>
						<h4>{this.props.category}</h4>
					</div>
				</div>
				<div className="row d-flex">
					<div className="col-lg-4 text-center order-lg-last p-3">
						<img src={imgSrc} alt="Sprite" className="align-middle sugimori"/>
					</div>
					<div className="col-lg-4 offset-lg-2 order-lg-first">
						<div className="basicInfo pt-3">
							<div className="text-center">
								<p>Types: {this.joinArray(this.props.types)}</p>
								<p>Abilities: {this.joinArray(this.props.abilities)}</p>
								<div className="row text-center">
									<div className="col">
										<p>Height: {this.convertHeight(this.props.height)}"</p>
									</div>
									<div className="col">
										<p>Weight: {this.convertWeight(this.props.weight)}lb</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flavorText p-3">
							<p>{this.props.entry}</p>
						</div>
					</div>
				</div>
			</div>
			</div>
		)
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