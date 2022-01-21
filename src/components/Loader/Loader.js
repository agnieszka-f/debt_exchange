import './Loader.scss';
import React from 'react';

function Loader() {

const [big, setBig] = React.useState(0);

const handleSetBig = () => { 
  if(big >= 0 && big < 5) setBig(big+1);
  else setBig(0);
}

const handleAddBig = (index) =>{ 
    if( index === big) return 'big';
    else return '';
  }

React.useEffect(()=>{ 
    let timer =  setTimeout(()=>handleSetBig(), 400);
    return () => {
        clearTimeout(timer);
      };
    });

return (
    <div className="loader">
      {
          [1,2,3,4,5,6].map((item, index) =><div className={`loaderItem + ${handleAddBig(index)}`} key={item}></div>)
      }
    </div>
  );
}

export default Loader;
