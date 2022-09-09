import React from 'react';
import Contacts from './contacts.json';
import './App.css';
import { useState } from 'react';

function App() {
  const [contactsState, setContacts] = useState(Contacts.slice(0,5));
  
  function buttonRandom () {
    let randomIndex;
    do {
      randomIndex = parseInt(Math.random()*Contacts.length);
    } while(contactsState.includes(Contacts[randomIndex]));

    setContacts([...contactsState, Contacts[randomIndex]]
    );
  }

  function sortByName () {
    const newState = [...contactsState].sort((a,b)=> {
      return a.name.localeCompare(b.name)
    });
    setContacts(newState);
  }

  function sortByPop () { //eslint-disable-next-line
    const newState = [...contactsState].sort((a,b)=> {
      if(a.popularity<b.popularity){
        return 1;
      }
      else if (a.popularity>b.popularity){
        return -1;
      }
      else if(a.popularity===b.popularity){
        return 0;
      }
    });
    setContacts(newState);
  }

  function deleteContact(id) {
    const newState = [...contactsState].filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newState);
  }

  return (
    <div className="App">
      <button onClick={()=>{buttonRandom()}}>Add random contact</button>
      <button onClick={()=>{sortByName()}}>Sort by Name</button>
      <button onClick={()=>{sortByPop()}}>Sort by Popularity</button>
      <table>
        <thead>
            <tr>
                <th colSpan={contactsState.length}>IronContacts</th>
            </tr>
            <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Popularity</th>
                <th>Oscar</th>
                <th>Emmy</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
          {contactsState.map(contact => {
            if(contact.wonEmmy){  contact.wonEmmy="🏆" }
            if(contact.wonOscar){  contact.wonOscar="🌟" }
            return (
              <tr key={contact.id}>
                  <td className='contact-picture'><img src={contact.pictureUrl} alt="profile"/></td>
                  <td>{contact.name}</td>
                  <td>{contact.popularity}</td>
                  <td>{contact.wonOscar}</td>
                  <td>{contact.wonEmmy}</td>
                  <td>
                  <button onClick={()=>{deleteContact(contact.id)}}>Delete</button>
                  </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;