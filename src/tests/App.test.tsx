import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { App } from '../App';


describe( 'Pruebas en App.tsx', () => {

  test( 'Debe renderizar el componente App correctamente', () => {
    const wrapper = render( <Provider store={ store }><App /></Provider> );
    expect( wrapper ).toMatchSnapshot();
  } );
  
});
