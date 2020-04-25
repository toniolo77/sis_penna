var React = require('react');
import {Link} from 'react-router-dom';
// require("../../styles/menu.scss");
require("../../styles/card.scss");



const Card = (props) => {
      return (
        <li className="col-md-2 col-xs-8" >
			<Link to={props.url}  >
                <div className="card">
                  <h1>{props.nombre}</h1>
                  <div>
                      <span className="helper"></span>
                      <img src={props.logo}/></div>
                </div>
			</Link>
		</li>
      );
}

export default Card
