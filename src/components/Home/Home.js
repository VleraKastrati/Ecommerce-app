import React, { useCallback, useEffect, useMemo, useState } from 'react'

function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    fetch('/ecommerce/api/products/${id}.json')
      .then(res => res.json())
      .then(json => setProducts(json));
  }, [])

  const filteredProducts = useMemo(() => {
    return products.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  }, [currentPage, products, pageSize])

  const numberOfPages = useMemo(() => {
    return Math.ceil(products.length / pageSize)
  }, [products, pageSize]);

  return (
    <div className='flex-grow'>
      <div className='flex-col'>
        {
          filteredProducts.map(p => <div key={p.id}>
            <span>{p.title}</span>
            <img src={p.image} width={200}></img>
          </div>)
        }
      </div>
      <div className='flex-row pagination-numbers'>
        {
          (new Array(numberOfPages)).fill(null).map((_, i) => <span key={i} onClick={() => setCurrentPage(i + 1)}>{i + 1}</span>)
        }
      </div>
    </div>
  )
}

export default Home