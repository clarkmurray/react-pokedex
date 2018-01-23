import React from 'react';
import {Spinner} from 'spin.js';

export default class LoadingSpinner extends React.Component {
	render() {
		return (
			<div className="row mt-4">
				<div className="col text-center">
					<div id="spinner"></div>
				</div>
			</div>
		);
	}

	componentDidMount() {
		let opts = {
			color: 'blue'
		}
		let target = document.getElementById('spinner');
		let spinner = new Spinner(opts).spin(target);
		target.appendChild(spinner.el);
	}
}