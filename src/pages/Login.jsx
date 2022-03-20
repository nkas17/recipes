import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/common/Header';
import { userLogin, userLogout } from '../actions/userActions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false,
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    // reset login status
    const { actions } = this.props;
    actions.userLogout();
  }

  componentDidUpdate() {
    const { authenticated, history } = this.props;
    if (authenticated) {
      history.push('/');
    }
  }

  _handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  _handleSubmit(e) {
    e.preventDefault();
    const { actions } = this.props;

    this.setState({ submitted: true });
    const { username, password } = this.state;

    if (username && password) {
      actions.userLogin(username, password);
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <>
        <Header />
        <article className="py-2">
          <div className="jumbotron">
            <h2>login</h2>
            <hr />
            <div className="col-md-6 col-md-offset-3">
              <form name="form" onSubmit={this._handleSubmit}>
                <div className={`form-group${submitted && !username ? ' has-error' : ''}`}>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    placeholder="enter username"
                    onChange={this._handleChange}
                  />
                  {submitted && !username && <div className="help-block">Username is required</div>}
                </div>
                <div className={`form-group${submitted && !password ? ' has-error' : ''}`}>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    placeholder="enter password"
                    onChange={this._handleChange}
                  />
                  {submitted && !password && <div className="help-block">Password is required</div>}
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                  {loggingIn && (
                    <img
                      alt="submission spinner"
                      src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                    />
                  )}
                  <Link to="/" className="btn btn-link">
                    continue as guest
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </article>
      </>
    );
  }
}

Login.propTypes = {
  actions: PropTypes.objectOf(PropTypes.any).isRequired,
  loggingIn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  loggingIn: !!state.user.authenticating,
  authenticated: !!state.user.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      userLogin,
      userLogout,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
