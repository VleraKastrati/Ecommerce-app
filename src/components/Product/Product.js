import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Product({ handleAddToCart, isClick }) {
    const [product, setProduct] = useState(null);
    const { id } = useParams(); 

    useEffect(() => {
        fetch(`/ecommerce/api/products/${id}.json`)
            .then(res => res.json())
            .then(res => setProduct(res))
            .catch(err => console.error("Gabim gjatë marrjes së produktit:", err));
    }, [id]);

    if (!product) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl transition-transform duration-300 hover:shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              
                <img 
                    src={`/ecommerce/images/${product.imageUrl}`} 
                    alt={product.name} 
                    className="w-full md:w-1/2 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
                />

               
                <div className="text-center md:text-left">
                    <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                    <p className="text-lg text-red-600 font-semibold mt-2">${product.price}</p>
                    {product.description && (
                        <p className="text-gray-600 mt-4">{product.description}</p>
                    )}

                    <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isClick[product.id]} 
                        className={`mt-6 px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${
                            isClick[product.id]
                            ? "bg-[white] text-white hover:bg-[#e21d12]"
                            : "bg-[#99120b] text-white hover:bg-[#bf160d] hover:shadow-lg"
                    }`}
                    >
                        {isClick[product.id] ? "✔️" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Product;
