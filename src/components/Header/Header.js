import  './Header.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Container from '../Container/Container.js';
import Loader from '../Loader/Loader.js';

function Header({debtsCount,fetchDebtsCount, loading, getFilteredDebts}) { 
  React.useEffect(() => {
    const getResult = async () =>{
      await fetchDebtsCount();
    };
    getResult();
  }, [fetchDebtsCount]);
    
  const [searchString, setSearchString] = React.useState('');

  const fieldChange = function(e){ 
    setSearchString(e.target.value);
  };
    
  const handleClick = () => {
    getFilteredDebts(searchString);
  };
    
  return (
    <div className="header"><Container>
      <div className="headerContainer">
        <div className="leftContainer">
          <p>Podaj numer sprawy, nazwę lub dłużnika</p>
          <div>
            <input onChange={(e) => fieldChange(e)} id='search'></input>
            <button className="searchButton" onClick={()=>handleClick()}>Szukaj</button>
          </div>
        </div>
        <div className="rightContainer">
          <p className="count">Całkowita ilość spraw</p>
          { loading.active ? <Loader /> : '' }
          { loading.error ? <p p className="count white">Wystąpił błąd podczas pobierania danych. Prosimy spróbować później.</p> : ''}
          { !loading.active && !loading.error && typeof debtsCount === 'number' ? 
            <p className="count white">{debtsCount}</p> : '' }
               
        </div>
      </div> 
    </Container></div>
  );
}

Header.propTypes = {
  debtsCount: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  fetchDebtsCount: PropTypes.func,
  loading: PropTypes.shape({active: PropTypes.bool, error: PropTypes.bool }),
  getFilteredDebts: PropTypes.func,
};

export default Header;