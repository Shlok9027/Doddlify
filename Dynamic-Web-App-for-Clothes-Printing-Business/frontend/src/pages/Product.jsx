import React, { use, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductdata = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        // console.log(item);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductdata();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-4 border-purple-500 p-10 transition-opacity ease-in duration-500 opacity-100 bg-gradient-to-br from-white via-purple-50 to-purple-100">
      {/* Product Image and Details  */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex-col-reverse flex gap-3 sm:flex-row">
          <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[19.9%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer hover:scale-110 hover:rotate-1 transition-all duration-300 border-2 border-transparent hover:border-purple-400 hover:shadow-md rounded-lg"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[60%]">
            <img className="w-full h-auto rounded-xl shadow-xl transition-transform hover:scale-105 duration-300" src={image} alt="" />
          </div>
        </div>

        {/* Product information */}
        <div className="flex-1 text-purple-900">
          <h1 className="font-semibold text-3xl mt-2 tracking-tight hover:text-purple-700 transition-colors duration-300">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-3">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="" className="w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="" className="w-4" />
            <p className="pl-2 text-gray-700 hover:text-purple-700 transition-colors duration-300">(122 ratings)</p>
          </div>

          <p className="mt-5 text-4xl font-bold text-purple-800 transition-colors hover:text-purple-600 duration-300">
            {currency} {productData.price}
          </p>
          <p className="mt-4 text-gray-700 w-4/5 leading-relaxed">{productData.description}</p>

          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium text-md text-gray-800">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 rounded-lg transition-all duration-300 font-medium shadow-sm hover:shadow-lg
                    ${item === size
                      ? 'bg-purple-600 text-white border-purple-800 scale-105'
                      : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-100 hover:text-purple-900'}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => addToCart(productData._id,size)} className="bg-purple-800 hover:bg-purple-700 text-white px-10 py-3 rounded-full text-md font-semibold shadow-md transition-all duration-300 hover:scale-105">
            ADD TO BAG
          </button>
          <hr className="mt-10 sm:w-4/5 border-purple-300" />

          <div className="text-sm text-gray-600 mt-6 flex flex-col gap-2">
            <p>✅ 100% Genuine & Quality-Checked Products</p>
            <p>💰 COD (Cash on Delivery) Available</p>
            <p>🔁 Easy 7-Day Return & Exchange Policy</p>
          </div>
        </div>
      </div>

      {/* Description and Review Section */}
      <div className="mt-14">
        <div className="flex">
          <b className="border border-purple-300 px-5 py-3 text-sm bg-purple-100 text-purple-800 cursor-pointer hover:bg-purple-200 transition">
            Product Details
          </b>
          <p className="border border-purple-300 px-5 py-3 text-sm hover:bg-purple-100 cursor-pointer transition-colors duration-200">
            Reviews (51)
          </p>
        </div>

        <div className="flex flex-col gap-4 border border-purple-100 bg-white px-6 py-6 text-sm text-gray-700 leading-relaxed hover:shadow-md transition-shadow duration-300">
          <p>
            An e-commerce website is a digital storefront that enables consumers to browse, compare, and purchase products online with ease and convenience. <br />
            It bridges the gap between sellers and buyers by offering 24/7 accessibility and a wide variety of product categories. <br />
            With the growing popularity of online shopping, these platforms are becoming essential for modern businesses to thrive in a competitive market.
          </p>

          <p>
            These platforms typically feature detailed product listings, customer reviews, secure payment gateways, and reliable delivery services. <br />
            From fashion to electronics, users can access a wide variety of categories from the comfort of their home. <br />
            Seamless navigation, filters, and personalized recommendations help enhance the shopping experience.
          </p>
        </div>
      </div>


{/* ========================= displaying other related products ===================================== */}

              <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;

