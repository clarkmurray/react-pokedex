import React from 'react';


export default class Pokemon extends React.Component {
	render() {
		return (
			<div className="row mt-4">
				<div className="col text-center">
					<p>You searched for {this.props.pokemon.name}</p>
				</div>
			</div>
		)
	}
}