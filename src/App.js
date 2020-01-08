import React, { useEffect, useState } from 'react';
import { Recipe } from './components/recipe/recipe.component';
import './App.css';

const App = () => {
  const APP_ID = '0d641ed2';
  const APP_KEY = 'fe0df87959a853a589f86454aabefd60';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
    };
    getRecipes();
  }, [query]);

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="title">Recipes Search App</h1>
        <div id="cover">
          <form onSubmit={getSearch}>
            <div class="tb">
              <input type="text" value={search} onChange={updateSearch} placeholder="Search Recipe" required />
              <div class="td" id="s-cover">
                <button type="submit" >
                  <div id="s-circle"></div>
                  <span></span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </header>
      <div className="recipes">
        {recipes.map((recipe, index) => (
          <Recipe
            key={index}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
