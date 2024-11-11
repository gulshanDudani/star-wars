import React from 'react';
import CryptoJS from "crypto-js"
import './App.css';
import useLocalStorage from './Hooks/useLocalStorage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CharacterList from './Components/CharacterList/CharacterList';
import CharacterDetails from './Components/CharacterDetails/CharacterDetails';
import Favourites from "./Components/Favourites/Favourites"


function App() {
  useLocalStorage("favourites", CryptoJS.AES.encrypt(JSON.stringify([]),"favourites").toString());
  const router = createBrowserRouter([
{
  path: "/",
  element: <CharacterList/>
},
{
  path: "/details/:id",
  element: <CharacterDetails/>
},
{
  path: "/favourites",
  element: <Favourites/>
}
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
