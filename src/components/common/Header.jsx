import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingDots from './LoadingDots';

/**
 * Common Header component
 */
const Header = ({ loading, navigation, authenticated }) => (
	<header>
		<h1 className="page-header">come and eat!</h1>
		{navigation && (
			<nav>
				<Link to="/recipe">recipes</Link>|<Link to="/about">about</Link>|
				<Link to="/login">log&nbsp;{authenticated ? 'out' : 'in'}</Link>
				{loading && <LoadingDots interval={200} dots={10} />}
			</nav>
		)}
	</header>
);

Header.defaultProps = {
	navigation: true,
};

Header.propTypes = {
	loading: PropTypes.bool.isRequired,
	navigation: PropTypes.bool,
	authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	loading: state.numAjaxCallsInProgress > 0,
	authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Header);
export { Header as HeaderTest, mapStateToProps };
