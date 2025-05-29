import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category, subCategory }) => {

    const {products} = useContext(ShopContext);

    const [related, setrelated] = useState([]);

    useEffect(() => {

        if (products.length > 0) {
            
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item) => category ==item.category);
            productsCopy = productsCopy.filter((item)=> subCategory == item.subCategory);

            // console.log(productsCopy.slice(0,5));

            setrelated(productsCopy.slice(0,5));
            
        }

    },[products],)

  return (
   <div className="my-24 px-4 sm:px-8">
  <div className="text-center text-3xl py-2 font-bold text-purple-800 hover:text-purple-600 transition-colors duration-300">
    <Title text1={'YOU MAY ALSO'} text2={' LIKE THESE'} />
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6 md:gap-8 lg:gap-10 mt-8">
    {related.map((item, index) => (
      <div
        key={index}
        className="transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl bg-white rounded-xl border border-purple-100 p-2"
      >
        <ProductItem
          id={item._id}
          name={item.name}
          price={item.price}
          image={item.image}
        />
      </div>
    ))}
  </div>
</div>

  )
}

export default RelatedProducts