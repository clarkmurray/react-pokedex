import React from 'react';

export default class EvolutionChain extends React.Component {
	constructor(props) {
		super(props);
		this.joinEvolutions = this.joinEvolutions.bind(this);
	}

	render() {
		const evolutions = this.props.evolutions.map((evolutionChain, index) =>
			<img key={index} src="https://img.pokemondb.net/artwork/luvdisc.jpg" />
		);
		return (
			<div className="row mt-4">
					<div className="col text-center">
						<p>Evolutions</p>
						<div>
							{evolutions}
						</div>
					</div>
			</div>
		)
	}

	joinEvolutions(array) {
		const vm = this;
		let evolutionChains = [];
		console.log(array);
		// if (array.length === 1) {
		// 	evolutionChains = array[0];
		// 	console.log(evolutionChains);
		// 	console.log("The loop will not be entered");
		// 	return evolutionChains;
		// }
		// for (let i = 0; i < array.length; i++){
		// 	console.log(array[i]);
		// }
		// return evolutionChains;
			
	}
}