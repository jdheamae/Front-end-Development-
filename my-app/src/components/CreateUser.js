import axios from "axios";
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
function CreateUser() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const [title, setTitle] = useState()
    const [isbn, setISBN] = useState()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/create', { name, email, age, title, isbn })
            .then(res => {
                console.log(res);
                navigate('/')
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center"style={{backgroundColor: '#FFFF00' }}>
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}> 
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name:</label>
                        <input 
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmFor="">Email:</label>
                        <input 
                            type="email"
                            placeholder="Enter Email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age:</label>
                        <input 
                            type="text"
                            placeholder="Enter Age"
                            className="form-control"
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Title:</label>
                        <input 
                            type="text"
                            placeholder="Enter Title"
                            className="form-control"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">ISBN:</label>
                        <input 
                            type="text"
                            placeholder="Enter ISBN"
                            className="form-control"
                            onChange={(e) => setISBN(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;