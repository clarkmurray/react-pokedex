import React from 'react';


export default class Pokemon extends React.Component {

	render() {
		const query = this.props.pokemon;
		if (query) {
			return (
				<div className="row mt-4">
					<div className="col text-center">
						<p>{this.props.pokemon}</p>
						<p>{this.props.weight}</p>
						<img src={this.props.url} alt="Sprite" />
					</div>
				</div>
			)
		} else {
			return <div></div>
		}
	}

}