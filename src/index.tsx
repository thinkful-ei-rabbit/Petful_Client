import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

//? import layout: modules(\n\n) styles(\n\n) locals(\n\n)
import './index.css';

//? paths: './' when able, if not use alias 'src/...'
import App from './app/app';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

/*
* Component types:

? Don't use React.FC, instead: children?: React.ReactNode
? Component types naming convention: 'CompName' + 'Props'
? All comps should be typed as follows:

*  type CompProps = (props: {
*    prop1: string;
*    children?: React.ReactNode
*  }) => JSX.Element (relevent return type)
*
*  const Comp: CompProps = ({prop1, children}) => {}
*/
