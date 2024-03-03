import React from 'react';

const CustomerTable = ({ customers, currentPage, customersPerPage }) => {
    // Calculate the starting index based on the current page
    const startIndex = Number((currentPage - 1) * customersPerPage) + 1;

    return (
        <table className="customer-table">
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Customer Name</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer, index) => (
                    <tr key={index}>
                        {/* Calculate the serial number dynamically */}
                        <td>{startIndex + index}</td>
                        <td>{customer.customer_name}</td>
                        <td>{customer.age}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.location}</td>
                        <td>{new Date(customer.created_at).toLocaleDateString()}</td>
                        <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomerTable;
