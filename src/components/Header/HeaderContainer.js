import {connect} from 'react-redux';
import Header from './Header';
import {getDebtsCount, fetchDebtsCount, fetchFilteredDebts, getLoadingCount} from '../../redux/debtsRedux.js';

const mapStateToProps = (state, props) => ({
  debtsCount: getDebtsCount(state),
  loading: getLoadingCount(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchDebtsCount: () => dispatch(fetchDebtsCount()),
  getFilteredDebts: (data) => dispatch(fetchFilteredDebts(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);