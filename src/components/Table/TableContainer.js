import {connect} from 'react-redux';
import Table from './Table';
import {getTopDebts, fetchTopDebts, getLoading} from '../../redux/debtsRedux.js';

const mapStateToProps = (state) => ({
  topDebts: getTopDebts(state),
  loading: getLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTopDebts: () => dispatch(fetchTopDebts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);