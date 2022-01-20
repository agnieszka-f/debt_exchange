import {connect} from 'react-redux';
import Header from './Header';
import {getDebtsCount, fetchDebtsCount, getLoading, getSearchDebts} from '../../redux/debtsRedux.js';

const mapStateToProps = (state, props) => ({
  debtsCount: getDebtsCount(state),
  loading: getLoading(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchDebtsCount: () => dispatch(fetchDebtsCount()),
  getSearchDebts: (data) => dispatch(getSearchDebts(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);