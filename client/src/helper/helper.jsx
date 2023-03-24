import { useEffect, useState } from 'react';
import axios from 'axios';

export function usePagination(count) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);


  const fetchBooks = (count, page) =>
  axios({
    method: 'post',
    url: `http://localhost:8000/studentByCountry?limit=${count}&page=${page}`,
    data:{
        country:"ugandu"
      }
  });
//   axios.get(`http://localhost:8000/studentByCountry?limit=${1}&page=${1}`,body:{
//     country:"India"
//   }
//   );


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
  }, [page]);

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
    return page !== 0;
  };

  return {
    results,
    total,
    loading,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
  };
}