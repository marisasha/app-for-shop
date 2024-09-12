import React, { useState, useEffect } from "react";
import axios from "axios";
import * as bases from "../components/bases";
import Cookies from 'js-cookie'

export default function Home() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        title: '',
        description: '',
        price: ''
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/product');
            setProducts(response.data.data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    //@ts-ignore
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
    };
    //@ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const csrfToken = Cookies.get('csrftoken'); 
        try {
            await axios.post('http://127.0.0.1:8000/api/product', newProduct, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken 
                },
                withCredentials: true 
            });
            setNewProduct({ title: '', description: '', price: '' });
            fetchData();
        } catch (error) {
            console.error('Error adding new product:', error);
        }
    };

    return (
        <bases.Base1>
            <div className="w-5/6 m-auto pt-10">
                <div className="flex gap-x-20">
                    <form onSubmit={handleSubmit} className="border border-slate-800 p-4 w-2/6 h-72">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">
                            Добавить новый продукт
                        </h3>
                        <div className="flex flex-col space-y-4">
                            <input
                                type="text"
                                name="title"
                                value={newProduct.title}
                                onChange={handleInputChange}
                                placeholder="Название"
                                className="border border-slate-800 text-slate-800 p-2"
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                value={newProduct.description}
                                onChange={handleInputChange}
                                placeholder="Описание"
                                className="border border-slate-800 text-slate-800 p-2"
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                placeholder="Цена"
                                className="border border-slate-800 text-slate-800 p-2"
                                required
                            />
                            <button type="submit" className="bg-green-400 text-white p-2">
                                Добавить
                            </button>
                        </div>
                    </form>

                    <table className="table-auto w-full border-collapse border border-slate-800 text-slate-800">
                        <thead className="bg-slate-200">
                            <tr>
                                <th className="border border-slate-800 p-2">ID</th>
                                <th className="border border-slate-800 p-2">Название</th>
                                <th className="border border-slate-800 p-2">Описание</th>
                                <th className="border border-slate-800 p-2">Цена</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* @ts-ignore */}
                            {products.length > 0 ? (
                                products.map((item:any, index) => (
                                    item && (
                                        <tr key={item.id || index} className="hover:bg-slate-100">
                                            <td className="border border-slate-800 p-2">{item.id || '-'}</td>
                                            <td className="border border-slate-800 p-2">{item.title || '-'}</td>
                                            <td className="border border-slate-800 p-2">{item.description || '-'}</td>
                                            <td className="border border-slate-800 p-2">{item.price || '-'} руб.</td>
                                        </tr>
                                    )
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center p-4">Нет данных</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </bases.Base1>
    );
}