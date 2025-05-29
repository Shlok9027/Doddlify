import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({id, image , name, price}) => {

    const  {currency} = useContext(ShopContext);
  return (

    
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
         <div className='overflow-hidden '>

            <img className=' group hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br from-white via-sky-50 to-sky-100 rounded-xl p-2 transition-all duration-300 ease-in-out'
                src={image[0]} alt="" />

         </div>

            <p className='pt-3 pb-1 text-sm '>
                {name}
            </p>
            <p className='text-sm font-medium'>{currency} {price}</p>

        </Link>
   
  )
}

export default ProductItem