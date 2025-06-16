import React, { ChangeEvent, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { User, HandleInputType } from './types'

type CatName = "miffy" | "boris" | "mordred";

interface CatInfo {
  age: number;
  breed: string;
}

const cats: Record<CatName, CatInfo> = {
  boris: { age: 1, breed: 'd' }
};


function App() {
  const [cat, setCatName] = useState<CatName>('boris')

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    setCatName('')
    // console.log(event.target.value)
    // setUser({ age: 1, id: 5, name: '6' })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {user?.age}
          {user?.name}
          {user?.id}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input onChange={handleInput} />
      </header>
    </div>
  );
}

export default App;
