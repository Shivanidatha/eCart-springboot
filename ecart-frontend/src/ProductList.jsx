const ProductList = ({ products }) => {
  return (
    <div className='row'>
      {products.map(product => (
        <div className='col-md-4' key={product.id}>
          <div className='card'>
            <img src={product.imageUrl} className='card-img-top' alt={product.name} />
            <div className='card-body'>
              <h5 className='card-title'>{product.name}</h5>
              <p className='card-text'>{product.description}</p>
              <p className='card-text'><strong>Price:</strong> ${product.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList;