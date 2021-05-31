import React, {useEffect, useState} from 'react';
import api from './api-config/api';
import * as selectors from './Utils/TableSelectors';
import Table from './component/Table';
import './App.css';

// const GUIDE_LINES = [
//   'Please do not use any external library for completion of the task',
//   'For API call you can use Fetch API',
//   'CSS must be written in proper standard',
//   'All icons are provided in SVG format',
//   'Please do not change db.json',
//   'Please make use of bookId field for mapping in UI table => column Id',
//   'Please try and complete the functionalities in the stipulated time',
//   'Please concentrate on the tabe and its functionalitites more rather than on add book',
//   'Please keep your code as clean and simple as possible in the stipulated time',
//   'Please ensure that code quality,code flexibility is maintained',
//   'For list API please use: http://localhost:3004/books',
//   'To add a book make a POST request to this API: http://localhost:3004/books',
//   'Once u start with your code you can paste the contents of this page to Guidelines.jsx',
//   `Also there is an easter egg in this code below.There is a small performance improvement here.
//   If u have time please figure out,fix it and comment in the code`,
// ];
const App = () => {

  const [userState, setUserState] = useState([])
  useEffect(() => {
    fetch(api.fetchUserData)
    .then(resp => resp.json())
    .then(resp => {
      let sortUserData = selectors.sortUserDataSelector(resp);
      let finalTableData = selectors.createTableUIDataSelector(sortUserData);
      setUserState([
        ...finalTableData
      ]);
    });
  }, []);
  if(!userState.length) return null;
  return (
    <section>
      <div className="button">
        <h2>Library</h2>
        <button>Add Book</button>
      </div>
      <Table tableProps={userState}/>
  </section>
  )
};

export default App;
