"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock?: number;
  createdAt?: number;
  updatedAt?: number;
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/v1/product");
        const fetchedProducts = response.data.map(
          (item: any, index: number) => ({
            id: index + 1,
            name: item.name,
            price: item.price,
            category: item.type === "Noncoffe" ? "Non-Coffee" : "Coffee",
            stock: item.stock,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          })
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((product) => product.category === filter);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-full flex flex-col">
        <Navbar />
        <div className="text-black flex flex-grow">
          <div className="w-full p-4">
            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={() => setFilter("All")}
                className={`w-full font-semibold py-2 px-4 rounded ${
                  filter === "All"
                    ? "bg-orange-400 text-white"
                    : "bg-white text-black hover:bg-orange-100 hover:text-orange-500"
                } cursor-pointer`}
              >
                All menu
              </button>
              <button
                onClick={() => setFilter("Coffee")}
                className={`w-full font-semibold py-2 px-4 rounded ${
                  filter === "Coffee"
                    ? "bg-orange-400 text-white"
                    : "bg-white text-black hover:bg-orange-100 hover:text-orange-500"
                } cursor-pointer`}
              >
                Coffee
              </button>
              <button
                onClick={() => setFilter("Non-Coffee")}
                className={`w-full font-semibold py-2 px-4 rounded ${
                  filter === "Non-Coffee"
                    ? "bg-orange-400 text-white"
                    : "bg-white text-black hover:bg-orange-100 hover:text-orange-500"
                } cursor-pointer`}
              >
                Non-Coffee
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b-2 border-gray-200">ID</th>
                    <th className="py-2 px-4 border-b-2 border-gray-200">
                      Name
                    </th>
                    <th className="py-2 px-4 border-b-2 border-gray-200">
                      Price
                    </th>
                    <th className="py-2 px-4 border-b-2 border-gray-200">
                      Category
                    </th>
                    <th className="py-2 px-4 border-b-2 border-gray-200">
                      Stock
                    </th>
                    <th className="py-2 px-4 border-b-2 border-gray-200">
                      Created At
                    </th>
                    <th className="py-2 px-4 border-b-2 border-gray-200">
                      Updated At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="py-2 px-4 border-b">{product.id}</td>
                      <td className="py-2 px-4 border-b">{product.name}</td>
                      <td className="py-2 px-4 border-b">{product.price}</td>
                      <td className="py-2 px-4 border-b">{product.category}</td>
                      <td className="py-2 px-4 border-b">{product.stock}</td>
                      <td className="py-2 px-4 border-b">
                        {new Date(product.createdAt || 0).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {new Date(product.updatedAt || 0).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {message && <div className="mt-4 text-red-500">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
