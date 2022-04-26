import '../styles/App.scss';
import { useState } from 'react';
import quoteList from '../data/quotes.json';

function App() {
  // Variables de estado
  const [data, setData] = useState(quoteList);
  const [newQuote, setNewQuote] = useState({
    quote: '',
    character: '',
  });
  const [searchQuote, setSearchQuote] = useState('');
  const [searchCharacter, setSearchCharacter] = useState('todos');

  const handleNewQuote = (event) => {
    setNewQuote({
      ...newQuote,
      [event.target.id]: event.target.value,
    });
  };

  const handleClickAdd = (event) => {
    event.preventDefault();
    setData([...data, newQuote]);
    setNewQuote({
      quote: '',
      character: '',
    });
  };

  const handleSearchQuote = (event) => {
    setSearchQuote(event.target.value);
  };

  const handleSearchCharacter = (event) => {
    setSearchCharacter(event.target.value);
  };

  const htmlData = data
    // Double search by quote and character
    .filter((quote) => {
      return quote.quote.toLowerCase().includes(searchQuote.toLowerCase());
    })
    .filter((quote) => {
      if (searchCharacter === 'todos') {
        return true;
      }
      return quote.character
        .toLowerCase()
        .includes(searchCharacter.toLowerCase());
    })

    .map((quote, index) => {
      return (
        <li className='quote' key={index}>
          <p className='quote__item'>{quote.quote}</p>
          <span className='quote__character'>{quote.character}</span>
        </li>
      );
    });

  return (
    <>
      <header className='header'>
        <h1 className='header__title'>F·R·I·E·N·D·S' quotes</h1>
        <form>
          <input
            className='searchQuote__input'
            autoComplete='off'
            type='search'
            name='searchQuote'
            placeholder='Search quote'
            onChange={handleSearchQuote}
            value={searchQuote}
          />
          <select
            name='searchCharacter'
            id='searchCharacter'
            onChange={handleSearchCharacter}
            value={searchCharacter}
          >
            <option value='todos'>Todos</option>
            <option value='Rachel'>Rachel</option>
            <option value='Monica'>Monica</option>
            <option value='Phoebe'>Phoebe</option>
            <option value='Joey'>Joey</option>
            <option value='Chandler'>Chandler</option>
            <option value='Ross'>Ross</option>
          </select>
        </form>
      </header>

      <ul>{htmlData}</ul>

      <main className='main'>
        <form>
          <input
            className='quote__input'
            type='text'
            name='quote'
            id='quote'
            placeholder='Do you know any more quotes?'
            onChange={handleNewQuote}
            value={newQuote.quote}
          />
          <input
            className='character__input'
            type='text'
            name='character'
            id='character'
            placeholder='Who said it?'
            onChange={handleNewQuote}
            value={newQuote.character}
          />
          <input
            className='addBtn'
            type='submit'
            value='Add new quote'
            onClick={handleClickAdd}
          />
        </form>
      </main>
    </>
  );
}

export default App;
