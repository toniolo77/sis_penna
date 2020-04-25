var React = require('react');
// require("../../styles/backoffice.scss");
import Header from './Header';
import Footer from './Footer';

const Layout = (props) => {
      return (
        <div>
            <Header/>
					{props.children}
                    <div className="clear"></div>
			<Footer/>
        </div>
      );
}

export default Layout
