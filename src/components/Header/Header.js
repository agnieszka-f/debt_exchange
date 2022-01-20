import  './Header.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Container from '../Container/Container.js';

function Header({debtsCount,fetchDebtsCount, loading, getSearchDebts}) { 
    React.useEffect(() => {
        const getResult = async () =>{
          await fetchDebtsCount();
        };
        getResult();
      }, [fetchDebtsCount]);
    
    const [searchString, setSearchString] = React.useState('');

    const fieldChange = function(e){ 
        setSearchString(e.target.value);
    }
    
    const handleClick = () => {
        getSearchDebts({search: searchString});
        setSearchString('');
    }
    
  return (
    <div className="header"><Container>
    { loading.active ? <h2>Trwa wczytywanie danych...</h2> : '' }
    { loading.error ? <h2>Wystąpił błąd podczas pobierania danych. Prosimy spróbować później.</h2> : ''}
    {
        !loading.active && !loading.error && typeof debtsCount === 'number' ? 
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
                <p className="count white">{debtsCount}</p>
            </div>
        </div> : ''
    }
    </Container></div>
  );
}

Header.propTypes = {
  debtsCount: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  fetchDebtsCount: PropTypes.func,
  loading: PropTypes.shape({active: PropTypes.bool, error: PropTypes.bool }),
  getSearchDebts: PropTypes.func,
}

export default Header;