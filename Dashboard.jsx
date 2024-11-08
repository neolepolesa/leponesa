import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(storedProducts);
    }, []);

    // Prepare data for the bar chart
    const chartData = {
        labels: products.map(product => product.name),  // Product names as labels
        datasets: [
            {
                label: 'Stock Quantity',
                data: products.map(product => product.quantity), // Product quantities
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
                borderColor: 'rgba(75, 192, 192, 1)', // Border color
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Product Stock Quantity',
            },
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="dashboard-container">
            <header>
                <h1>Wings Cafe Management Dashboard</h1>
            </header>
            
            <nav>
                <Link to="/productmanagement">Manage Products</Link>
                <Link to="/usermanagement">Manage Users</Link>
            </nav>
            
            <section>
                <h2>Welcome to the Dashboard</h2>
                <p>Efficiently manage your cafe's products and users.</p>
            </section>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
                <button onClick={() => navigate(-1)}>Go Back</button>
                <button onClick={() => navigate("/")}>Logout</button>
            </div>

            <h3>Current Product Inventory</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price ($)</th>
                        <th>Stock Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.category}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.quantity}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No products available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Add the bar chart here */}
            {products.length > 0 && (
                <div style={{ marginTop: '40px' }}>
                    <h3>Stock Quantity Overview</h3>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
