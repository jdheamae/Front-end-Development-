import {Link, useParams } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import axios from "axios";

function Users(){
    const { id } = useParams()
    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = data.filter((user) =>
            Object.entries(user).some(([key, value]) =>
            (typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())) ||
            ((typeof value === 'number' || typeof value === 'string') &&
                (key !== 'isbn' || value.toString().includes(searchQuery)))
            )
        );
        setFilteredData(filtered);
    }, [searchQuery, data]);

    const fetchData = () => {
        axios.get('http://localhost:3001')
            .then(res => {
                console.log(res);
                setData(res.data);
            })
            .catch(err => console.log(err));
    };
    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = data.filter(user =>
            Object.values(user).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase()) ||
                typeof value === 'number' && value.toString().includes(searchQuery)
            )
        );
        setFilteredData(filtered);
    };

    const handleDelete =(id) => {
        axios.delete('http://localhost:3001/deleteuser/' + id)
            .then(res => {
                console.log(res)
            }).catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-200 bg-primary justify-content-center align-items-center"style={{backgroundColor: '#f8f9fa'}}>
            <div className="w-100 bg-white rounded p-1">
            <h2 className="d-flex justify-content-center align-items-center" > Books Information</h2>
            <form onSubmit={handleSearch}>
            <div className="d-flex justify-content-end mb-3">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search here"
                    className="form-control me-2"
                    style={{ width: '20%', backgroundColor: '#ced6da' }}
                />
                <button className="btn btn-success btn-sm" style={{ width: '', fontSize: '18px' }}>
                    Search
                </button>
                </div>
             </form>

                <Link to="/create" className="btn btn-success btn-sm"> 
                    <h5>Add User</h5>
                </Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Title</th>
                            <th>ISBN</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((user, index) => {
        return (
            <tr key={index}>
                <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{user.name}</td>
                <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{user.email}</td>
                <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{user.age}</td>
                <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{user.title}</td>
                <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>{user.isbn}</td>
                <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>
                    <Link to={`/edit/${user._id}`} className="btn btn-success me-2" style={{ width: '80px', height: '35px', fontSize: '15px' }}>Update</Link>
                    <button onClick={() => handleDelete(user._id)} className="btn btn-danger" style={{ width: '80px', height: '35px', fontSize: '15px' }}>Delete</button>
                </td>
            </tr>
        );
    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users; 