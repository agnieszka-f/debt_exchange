import {connect} from 'react-redux';
import App from './App';
import {getTopDebts, fetchTopDebts, getLoading} from './redux/debtsRedux.js';

const mapStateToProps = (state, props) => ({
  topDebts: getTopDebts(state),
  loading: getLoading(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchTopDebts: () => dispatch(fetchTopDebts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);