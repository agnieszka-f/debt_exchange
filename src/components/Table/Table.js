import  './Table.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Container from '../Container/Container.js';
import Loader from '../Loader/Loader.js';

function Table({fetchTopDebts, topDebts, loading}) { 

  React.useEffect(() => {
    const getResult = async () =>{
      await fetchTopDebts();
    };
    getResult();
  }, [fetchTopDebts]);

  const [activeRowId, setActiveRowId] = React.useState(null);

  const handleChangeActive = (id) => {
      
    if(id === activeRowId) {
      setActiveRowId(null);
    }
    else {
      setActiveRowId(id);
    }
  };
  return ( 
    <Container><div className="tableContainer">
      { loading.active ? <Loader /> : '' }
      { loading.error ? <h2>Wystąpił błąd podczas pobierania danych. Prosimy spróbować później.</h2> : ''}
      { !loading.active && !loading.error && topDebts.length === 0 ? <h2>Nie znaleziono żadnych danych.</h2> : ''}
      { !loading.active && !loading.error && topDebts.length > 0 ?
        <table>
          <thead>
            <tr>
              <th>Dłużnik</th>
              <th>Nip</th>
              <th>Wartość</th>
            </tr>
          </thead>
          <tbody>
            {
              topDebts.map( debt => <tr key={debt.Id} className={debt.Id === activeRowId ? 'activeRow' : ''}>
                <td>
                  <p className={debt.Id === activeRowId ? 'show' : 'hide'}>Dłużnik</p>
                  <p>{debt.Name}</p>
                  <p className={debt.Id === activeRowId ? 'show' : 'hide'}>Adres</p>
                  <p className={debt.Id === activeRowId ? 'show' : 'hide'}>{debt.Address}</p>                                          
                </td>
                <td>
                  <p className={debt.Id === activeRowId ? 'show' : 'hide'}>Nip</p>
                  <p>{debt.NIP}</p>
                  <p className={debt.Id === activeRowId ? 'show' : 'hide'}>Rodzaj/Typ dokumnetu stanowiacy podstawę dla wierzytelnosci</p>
                  <p className={debt.Id === activeRowId ? 'show' : 'hide'}>{debt.DocumentType}</p>                                           
                </td>
                <td>
                  <p className={debt.Id === activeRowId ? 'show' : 'hide'}>Kwota zadłużenia</p>
                  <p>{debt.Value}</p> 
                  <p className={debt.Id === activeRowId ? 'show' : 'hide'}>Cena zadłużenia</p>
                  <p className={debt.Id === activeRowId ? 'show' : 'hide'}>{debt.Price}</p>                                                                                  
                </td>
                <td>
                  <p className={debt.Id === activeRowId ? 'show' : 'hide'}>Numer</p>
                  <p className={debt.Id === activeRowId ? 'show' : 'hide'}>{debt.Number}</p> 
                </td>
                <td valign='top'>
                  <button onClick = {() => handleChangeActive(debt.Id)}>{debt.Id === activeRowId ? 'MNIEJ' : 'WIĘCEJ'}</button>
                </td>
              </tr>)
            }
          </tbody>
        </table> : ''  
      }
    </div></Container>
  );
}
Table.propTypes = {
  topDebts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  fetchTopDebts: PropTypes.func,
  loading: PropTypes.shape({active: PropTypes.bool, error: PropTypes.bool }), 
  display: PropTypes.string,
};

export default Table;