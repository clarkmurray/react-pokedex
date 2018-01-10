import React from 'react';

export default class EvolutionChain extends React.Component {
	render() {
		const vm = this;
		const secondStages = this.props.secondStage.map(function(evolution, index){
			return <li key={index}>{vm.props.baseStage} to {evolution}</li>
		});
		const thirdStages = this.props.thirdStage.map(function(evolution, index){
			return <p key={index}>{evolution}</p>
		});
		return (
			<div className="row">
				<div className="col"></div>
					<div className="col">
						<ul>
							{secondStages}
							{thirdStages}
						</ul>
					</div>
				<div className="col"></div>
			</div>
		)
	}
}