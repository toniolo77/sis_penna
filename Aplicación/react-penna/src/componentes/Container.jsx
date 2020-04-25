var React = require('react');

require("../styles/backoffice.scss");
require("../styles/font-awesome-4.7.0/scss/font-awesome.scss");

const Container = (props) => {
  return (
	<div className="gral-container">
		{props.children}
	</div>
  );
};

export default Container
