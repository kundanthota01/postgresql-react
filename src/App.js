import React, { useState, useEffect } from 'react';
import CustomerTable from './components/CustomerTable';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

function App() {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage] = useState(20);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const searchCustomers = async () => {
        try {
            const response = await axios.get(http://localhost:5000/search?query=${searchTerm});
            setCustomers(response.data);
        } catch (error) {
            console.error('Error searching customers:', error);
        }
    };

    const sortCustomers = async () => {
        try {
            const response = await axios.get(http://localhost:5000/sort/${sortBy});
            setCustomers(response.data);
        } catch (error) {
            console.error('Error sorting customers:', error);
        }
    };

    useEffect(() => {
        if (sortBy) {
            sortCustomers();
        }
    }, [sortBy]);

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <h1>Customer Management</h1>
            <SearchBar setSearchTerm={setSearchTerm} searchCustomers={searchCustomers} setSortBy={setSortBy} />
            <CustomerTable customers={currentCustomers} currentPage={currentPage} customersPerPage={customersPerPage} />
            <Pagination
                customersPerPage={customersPerPage}
                totalCustomers={customers.length}
                paginate={paginate}
            />
        </div>
    );
}

export default App;
