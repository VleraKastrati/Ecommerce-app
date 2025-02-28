import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

function Products({ handleAddToCart, isClick }) {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    useEffect(() => {
        fetch("/ecommerce/api/products.json")
            .then((res) => res.json())
            .then((res) => setProducts(res));
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredProducts = useMemo(() => {
        return products.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }, [currentPage, products]);

    const numberOfPages = Math.ceil(products.length / pageSize);

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg shadow-lg p-4 bg-white transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        <Link to={`/products/${product.id}`}>
                            <img
                                src={`/ecommerce/images/${product.imageUrl}`}
                                alt={product.name}
                                className="w-full md:w-auto size-40 object-cover rounded-md cursor-pointer"
                            />
                        </Link>
                        <h2 className="text-lg justify-center font-semibold mt-4 text-gray-900">
                            {product.name}
                        </h2>
                        <div className="mt-4 flex justify-between items-center">
                            <p className="text-[#e21d12] hover:text-[#000000] transition-colors cursor-pointer">
                                ${product.price}
                            </p>
                            <button
                                onClick={() => handleAddToCart(product)}
                                disabled={isClick[product.id]}
                                className={`text-white px-4 py-2 rounded transition-all duration-300 hover:bg-[#e21d12] hover:shadow-md ${
                                    isClick[product.id] ? "bg-white cursor-pointer" : "bg-[#99120b]"
                                }`}
                            >
                                {isClick[product.id] ? (
                                    <span className="text-green-600 text-lg font-semibold transition-transform duration-300 scale-100 opacity-100">
                                        ✔️
                                    </span>
                                ) : (
                                    "Add to Cart"
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8 space-x-2">
                {[...Array(numberOfPages)].map((_, i) => (
                    <button
                        key={i}
                        className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:bg-[#99120b] hover:text-white shadow-md ${
                            currentPage === i + 1
                                ? "bg-[#bf160d] text-white"
                                : "bg-gray-200 hover:bg-[hover:bg-[#99120b]"
                        }`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Products;
