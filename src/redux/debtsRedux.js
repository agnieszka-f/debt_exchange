import Axios from 'axios';

/* selectors */
export const getTopDebts = ({debts}) => debts.data;
export const getLoading = ({debts}) => debts.loading;

export const getDebtsCount = ({debts}) => debts.count;
export const getLoadingCount = ({debts}) => debts.loadingCount;

/* action name creator */
const reducerName = 'debts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const FETCH_COUNT = createActionName('FETCH_COUNT');
const FETCH_START_COUNT = createActionName('FETCH_START');
const FETCH_ERROR_COUNT = createActionName('FETCH_ERROR');
/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const fetchCount = payload => ({ payload, type: FETCH_COUNT });
export const fetchStartedCount = payload => ({ payload, type: FETCH_START_COUNT });
export const fetchErrorCount = payload => ({ payload, type: FETCH_ERROR_COUNT });
/* thunk creators */
export const fetchTopDebts = () => { 
  return (dispatch, getState) => { 
    dispatch(fetchStarted());
    
    if(typeof getState.debts == 'undefined' || typeof getState.debts.data == 'undefined' || getState.debts.data.length < 1){
        
      Axios
      .get('http://rekrutacja-webhosting.it.krd.pl/api/Recruitment/GetTopDebts')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
    }
  };
};

export const fetchDebtsCount = () => {
  return (dispatch, getState) => { 
    dispatch(fetchStartedCount());
    
    if(typeof getState.debts == 'undefined' || typeof getState.debts.count != 'number'){
        
      Axios
      .get('http://rekrutacja-webhosting.it.krd.pl/api/Recruitment/GetDebtsCount')
      .then(res => {
        dispatch(fetchCount(res.data));
      })
      .catch(err => {
        dispatch(fetchErrorCount(err.message || true));
      });
    }
  };
};
export const fetchFilteredDebts = (data) => { 
  
  if(data != ''){ 
    return (dispatch) => { 
      dispatch(fetchStarted());
        Axios
        .post('http://rekrutacja-webhosting.it.krd.pl/api/Recruitment/GetFilteredDebts', {search: data})
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    };
 } else return fetchTopDebts();
};
/* reducer */
export const reducer = (statePart = [], action = {}) => { console.log(action);
  switch (action.type) { 
    case FETCH_START: { 
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: { 
      return { 
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_START_COUNT: { 
      return {
        ...statePart,
        loadingCount: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_COUNT: { 
      return { 
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        count: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case FETCH_ERROR_COUNT: {
      return {
        ...statePart,
        loadingCount: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
};