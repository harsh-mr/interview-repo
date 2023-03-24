import logo from './logo.svg';
import './App.css';
import { usePagination } from './helper/helper';
import {Table} from './components/table';
import {Form} from './components/form.js';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Comparison } from './components/comparison';

function App() {
  const [count, setCount] = useState(3);
  const [country, setCountry] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchBooks = (count, page) =>
  axios({
    method: 'post',
    url: `http://localhost:8000/studentByCountry?limit=${count}&page=${page}`,
    data:{
        country:country
      }
  });
  // const { results, nextPage, prevPage, canNextPage, canPrevPage } =usePagination(count);
  const handlePage = (e) => {
    console.log('count',e.target.value)
    setCount(e.target.value);
  };
  const handleCountry = (e) => {
    console.log('count',e.target.value)
    setCountry(e.target.value);
  };


  useEffect(() => {
    console.log(`Fetching Data for Page: ${page}`);
    setLoading(true);
    fetchBooks(count, page)
      .then(({ data }) => {
        console.log('data', data.data)
        setResults(data.data.results);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [page,count,country]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };
  

  const canNextPage = () => {
    const currentPage = page + 1;
    const lastPage = Math.ceil(total / count);
    return currentPage !== lastPage;
  };

  const canPrevPage = () => {
    return page !== 1;
  };
  
  return (
    <div className="App">
      <div className="container" style={{display:"flex" ,margin:"100px" , justifyContent: "center",
alignItems: "center",
}}>

       <div>
       <input type="text" onInput ={(e)=>handleCountry(e)} />

      <Table results={results} />
      <button onClick={prevPage} disabled={!canPrevPage()}>
        Prev
      </button>
      <button onClick={nextPage} disabled={!canNextPage()}>
        Next
      </button>
    <input type="number" onInput ={(e)=>handlePage(e)} />
    <div style={{margin:'100px'}}>
    <Form/>
    </div>
    <div>
        <Comparison/>
    </div>

      
    </div>
      </div>
    </div>
  );
}

export default App;
