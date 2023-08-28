import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Add() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditing = !!id;

  const initialFormValues = {
    name: '',
    email: '',
    phone: '',
  };

  const [values, setValues] = useState(initialFormValues);

  useEffect(() => {
    if (isEditing) {
      axios
        .get(`http://localhost:3000/users/${id}`)
        .then((result) => {
          setValues(result.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id, isEditing]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl = isEditing
      ? `http://localhost:3000/users/${id}`
      : 'http://localhost:3000/users/';

    const requestMethod = isEditing ? 'put' : 'post';

    axios[requestMethod](apiUrl, values)
      .then((result) => {
        console.log(result);
        navigate('/user');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>{isEditing ? 'Edit User' : 'Add User'}</h1>
        <hr />

        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor='name'> Name: </label>
            <input
              type='text'
              name='name'
              className='form-control'
              value={values.name}
              onChange={(e) =>
                setValues({ ...values, name: e.target.value })
              }
            />
          </div>

          <div className='mb-2'>
            <label htmlFor='email'> Email: </label>
            <input
              type='email'
              name='email'
              className='form-control'
              value={values.email}
              onChange={(e) =>
                setValues({ ...values, email: e.target.value })
              }
            />
          </div>

          <div className='mb-2'>
            <label htmlFor='phone'> Phone: </label>
            <input
              type='number'
              name='phone'
              className='form-control'
              value={values.phone}
              onChange={(e) =>
                setValues({ ...values, phone: e.target.value })
              }
            />
          </div>

          <button className='btn btn-success'>
            {isEditing ? 'Edit' : 'Add'}
          </button>
          <Link to='/user' className='btn btn-primary ms-3'>
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Add;
