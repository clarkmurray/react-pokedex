import React from 'react';

export default class EvolutionChain extends React.Component {
	constructor(props) {
		super(props);
		this.joinEvolutions = this.joinEvolutions.bind(this);
	}
	render() {
		const vm = this;
		const evolutionTree = this.props.evolutions.map(function(evolutionChain, index){
			if (vm.props.evolutions[1]) {
				const evolutionBranch = evolutionChain.map(function(evolution, index){
					return <span key={index}>{evolution}</span>
				});
				return <li key={index}>{evolutionBranch}</li>
			} else {
				return <li key={index}>{vm.props.evolutions[0]}</li>
			}
		});
		return (
			<div className="row mt-4">
				<div className="col"></div>
					<div className="col text-center">
						<ul>
							{evolutionTree}
						</ul>
					</div>
				<div className="col"></div>
			</div>
		)
	}

	componentDidMount() {
		this.joinEvolutions(['dratini', 'dragonair', 'dragonite']);
	}

	joinEvolutions(array) {
		array = array.join(" -> ");
		console.log(array);
	}
}