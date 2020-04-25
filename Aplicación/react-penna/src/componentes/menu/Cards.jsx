var React = require('react');
// require("../../styles/menu.scss");

const Cards = (props) => {
      return (
        <section className="col-md-12">
			{props.children}
		</section>
      );
}

export default Cards
