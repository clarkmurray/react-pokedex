import React from 'react';
import $ from 'jquery';

export default class LoadingSpinner extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			rotation: 0
		};
		this.rotate = this.rotate.bind(this);
	}
	render() {
		const { rotation } = this.state;
		return (
			<div className="row mt-4">
				<div className="col text-center">
					<img src="http://thecraftchop.com/files/others/Pokeball.svg" height="200px" width="200px" className="rotating" />
				</div>
			</div>
		);
	}

	rotate() {
		let newRotation = this.state.rotation + 45;
		if (newRotation >= 360){
			newRotation =- 360;
		}
		this.setState({
			rotation: newRotation
		})
	}
}