import { useState, useEffect } from 'react';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import './App.css'

function App() {

  const [products, setProducts] = useState([]);
  const[categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const[searchTerm, setSearchTerm] = useState("");
  const[sortOrder, setSortOrder] = useState('asc');


  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));

    fetch('http://localhost:8080/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };
  
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId ? Number(categoryId) : null );
  };

  const filteredProducts = products
    .filter(product => {
      return (
        (selectedCategory ? product.category.id === selectedCategory : true) 
        &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

  return (
    <div className='container'>
      <h1 className='my-4'>Product Catalog</h1>
      
      <div className='row align-items-center mb-4'>
        <div className='col-md-4'>
          <CategoryFilter categories={categories} onSelect={handleCategorySelect} />
        </div>
        
        <div className='col-md-4'>
          <input
            type='text'
            className='form-control'
            placeholder='Search products...'
            onChange={handleSearchChange}
            />
        </div>
        
        <div className='col-md-4'>
          <select className='form-control' onChange={handleSortOrderChange}>
            <option value='asc'>Sort by Price: Low to High</option>
            <option value='desc'>Sort by Price: High to Low</option>
          </select>
        </div>
      </div>
      
      <div>
        {filteredProducts.length > 0 ? (
          <ProductList products={filteredProducts} />
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>

  )
}

export default App
