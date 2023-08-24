import React from 'react'
import {useParams,Link} from 'react-router-dom'
import {useEffect,useState} from 'react'

import axios from 'axios'

function View(props) {

	const [data,setData]=useState([])
	const {id}=useParams();

	useEffect(() => {
		axios.get('http://localhost:3000/users/'+id)
			.then(result => setData(result.data))
			.catch(err => console.log(err))

	},[])

	const handleEditState = () => {
		console.log("Hllo" + props.identifier)
		props.setFunction(true);
		console.log("Bye" + props.identifier)
	};

	return (

		<div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>

			<div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>

				<h1>Details of User</h1>

				<div className='mb-2'>
					<strong> Name : {data.name}</strong>
				</div>

				<div className='mb-2'>
					<strong> Email : {data.email}</strong>
				</div>
				<div className='mb-2'>
					<strong> Phone : {data.phone}</strong>
				</div>


				<Link to={`/user/edit/${id}`} className='btn btn-success' onClick={handleEditState}> Edit</Link>
				{console.log(props.identifier)}
				<Link to='/user' className='btn btn-primary ms-3'> Back</Link>
			</div>



		</div>
	)
}

export default View