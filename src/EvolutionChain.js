import React from 'react';

export default class EvolutionChain extends React.Component {
	constructor(props) {
		super(props);
		this.joinEvolutions = this.joinEvolutions.bind(this);
	}

	render() {
		return (
			<div className="row mt-4">
					<div className="col text-center">
						<p>Evolutions</p>
						<ul>
							{this.joinEvolutions(this.props.evolutions)}
						</ul>
					</div>
			</div>
		)
	}

	joinEvolutions(array) {
		const vm = this;
		let evolutionChains = [];
		for (let i = 0; i < array.length; i++){
			vm.props.capitalizeItems(array[i]);
			if (typeof array === "string") {
				return <li>{array}</li>;
			}
			let newArray = array[i].join(" -> ");
			evolutionChains.push(<li>{newArray}</li>);
		}
		return evolutionChains;
			
	}
}