import React from 'react';
import './App.css';
import BooksContainer from './components/Books/BooksContainer';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
       <Route path='/:bookId'
        render={() => <BooksContainer />}
      />
      <Route path='/'
        render={() => <BooksContainer />}
      />
         </div>
  );
}

export default App;
