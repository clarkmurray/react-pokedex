import React from 'react';
import $ from 'jquery';

export default class LoadingSpinner extends React.Component {
	render() {
		return (
			<div className="row mt-4">
				<div className="col text-center">
					<img src="http://thecraftchop.com/files/others/Pokeball.svg" height="400px" width="400px" id="spinner" />
				</div>
			</div>
		);
	}

	// componentDidMount(){
	// 	$('#spinner').click(function() {
 //    		$('#spinner').rotate({count: 9999, forceJS: true});
 //  		}).click();
	// }
}