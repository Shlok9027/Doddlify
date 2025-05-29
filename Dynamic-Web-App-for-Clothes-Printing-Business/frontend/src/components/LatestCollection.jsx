import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    const [latestProduct, setLatestProduct ] = useState([]);
    
    useEffect(() => {
        setLatestProduct(products.slice(0, 10));
    },[products]);
    
  
    // console.log(products);
    
  return (



<div className='my-16 px-4 sm:px-8 lg:px-16'>
  <div className='text-center py-10 text-4xl font-extrabold tracking-tight text-gray-800'>
    <Title text1={'TRENDING'} text2={' NOW'} />
    <p className='w-full sm:w-3/4 lg:w-2/3 mx-auto text-sm sm:text-base md:text-lg text-gray-500 mt-4 leading-relaxed'>
Hot Right Now — Trending Picks Everyone’s Adding to Bag!    </p>
  </div>

  {/* Rendering products  */}
  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-8 transition-all duration-300'>
    {
      latestProduct.map((item, index) => (
    //    add hover effects to the product item 
        <div
          key={index}
          className='group hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br from-white via-sky-50 to-sky-100 rounded-xl p-2 transition-all duration-300 ease-in-out'
        >
          <ProductItem
           key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        </div>
      ))
    }
  </div>
</div>



  )
}

export default LatestCollection