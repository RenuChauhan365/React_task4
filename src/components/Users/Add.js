import React,{useState,useEffect} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import axios from 'axios';

function Add(props) {

	const {id}=useParams();
	const navigate=useNavigate();

	//const [isEditMode, setIsEditMode] = useState(false);

	//const [initialValues,setInitialValues]=useState({
		//	name: "",
		//	email: '',
		//	phone: '',
	//})



	//useEffect(() => {
	//	handleSubmit();
	//},[]);


	const isEditMode = props.identifier === true;

	// useState
	const [values,setValues]=useState({
		name: '',
		email: '',
		phone: ''
	});



	//const handleSubmit=() => {
	//	//e.preventDefault();
	//	//if(props.identifier===true) {

	//		axios.get(`http://localhost:3000/users/${id}`)
	//			.then(response => {
	//				const userData=response.data;
	//				console.log(userData)

	//				setValues(prevValues => ({
	//					...prevValues,
	//					name: userData.name,
	//					email: userData.email,
	//					phone: userData.phone,
	//				}));

	//				navigate('/user');

	//			})
	//			.catch(error => {
	//				console.log(error);
	//			});
	//	//}
	//	//else if(props.identifier!=true) {
	//	//	axios.get(`http://localhost:3000/users/${id}`)
	//	//		.then(response => {
	//	//			const userData=response.data;
	//	//			setValues(userData.name,userData.email,userData.phone);
	//	//			navigate('/user');
	//	//		})
	//	//		.catch(error => {
	//	//			console.log(error);
	//	//		});
	//	//}



	//	// axios.post('http://localhost:3000/users/' , values)
	//	// .then(result =>
	//	//	{
	//	//		console.log(result);
	//	//		navigate('/user');
	//	//	})
	//	// .catch(err => console.log(err))
	//}


	useEffect(() => {
    if (isEditMode) {
      axios.get(`http://localhost:3000/users/${id}`)
        .then(response => {
          const userData = response.data;
          setValues({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id, isEditMode]);


	const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      // Logic to update user data via axios
    } else {
      // Logic to add new user data via axios
    }

    navigate('/user');
  };


	console.log("Renu"+props.identifier);

	
	return (

		<div className='d-flex  justify-content-center align-items-center bg-light'>

			<div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>


				<h1>User's Details </h1>
				<hr />
				<form onSubmit={handleSubmit}>

					<div className='mb-2'>
						<label htmlFor="name"> Name: </label>
						<input type="text" name='name' className='form-control' placeholder='Enter Name' value={values.name}
							onChange={e => setValues({...values,name: e.target.value})} />
					</div>

					<div className='mb-2'>
						<label htmlFor="email"> Email: </label>
						<input type="email" name='email' className='form-control' placeholder='Enter Email'
							onChange={e => setValues({...values,email: e.target.value})} />
					</div>

					<div className='mb-2'>
						<label htmlFor="phone"> Phone : </label>
						<input type="number" name='phone' className='form-control' placeholder='Enter Phone'
							onChange={e => setValues({...values,phone: e.target.value})} />
					</div>


					<button className='btn btn-success'>{props.identifier===true? 'Edit':'Add'}</button>
					<Link to='/user' className='btn btn-primary ms-3'>Back</Link>


					{/*<button className='btn btn-success'> Add</button>*/}
					{/*<Link to={`/edit/${values.id}` } classNa
						me='btn btn-primary ms-3'>Edit</Link>*/}

				</form>

			</div>

		</div>
	)
}

export default Add