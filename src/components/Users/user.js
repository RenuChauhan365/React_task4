import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link,useNavigate,useParams ,useSearchParams, useLocation} from 'react-router-dom'
import {Modal} from 'antd';
import Pagination from  './Pagination';

function User(props) {




	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	const [totalItems, setTotalItems] = useState(0); // Total number of items from the API


	// this is for the  delete button
	const [showDeleteConfirmation]=useState(true);
	const [isModelOpen,setIsModelOpen]=useState(false);
	const [setDeluser]=useState();

	// this is for the modal
	const [data,setData]=useState([]);
	const [value,setValue]=useState("");
	const [sortValue,setSortValue]=useState("");


	const navigate=useNavigate();
	const {id}=useParams();
	const sortOptions=["name","email","phone"];


		// this is for the pagination
		const location = useLocation();
		const queryParams = new URLSearchParams(location.search);
		//queryParams.set('_page', currentPage);
		//const [currentPage, setCurrentPage] = useState(1)
		const [usersPerPage] = useState(2)

		const [searchParams,setSesrchParams] = useSearchParams()
		const pageParam = searchParams.get('page');
		useEffect(() => {
			if (!pageParam) {
				// navigate('/user?page=1', { replace: true });
				// return;
				setSesrchParams({page:1})
			}
			if (!isNaN(pageParam)) {
				setCurrentPage(parseInt(pageParam));
			} else {
				setCurrentPage(1);
			}
		}, [pageParam]);


		const handlePaginationClick = (newPage) => {
			setCurrentPage(newPage);
			//queryParams.set('_page', newPage);
			navigate(`/user?${newPage}`,{replace:true});
		};


	// this is for the modal function
	const OnOkay=() => {
		handleDelete(+id);
		setIsModelOpen(false)
		navigate('/user')
	}

	const OnCancel=() => {
		setIsModelOpen(false)
		navigate('/user')

	}

	useEffect(() => {
		loadUserData();
	},[currentPage])


	const loadUserData = async () => {
		try {
			const response = await axios.get(`http://localhost:3000/users/`, {
				params: {
					_page: currentPage,
					_limit: itemsPerPage,
				},
			});
			setData(response.data);
			setTotalItems(response.headers['x-total-count']); // Set total items count
		} catch (error) {
			console.log(error);
		}
	};


//  pagination function

	const handleDelete=() => {

		const mydeldata=data.filter((val) => val.id===+id)
		console.log(mydeldata)
		setDeluser(mydeldata)

		setIsModelOpen(true)
		axios.delete(`http://localhost:3000/users/${id}`)
			.then(result => {
				console.log(result);
			})
			.catch(err => {
				console.log(err);
			})
	}


	// define method here
	const handleSearch=async (e) => {

		e.preventDefault();
		console.log("Search triggered with value:", value); // Check if the function is being triggered
		try {
			const res = await axios.get(`http://localhost:3000/users?q=${value}`);
			console.log("Search result:", res.data); // Check if data is being retrieved
			setData(res.data);
			setValue("");
	} catch (err) {
			console.log("Search error:", err);
	}

		//return await axios.get(`http://localhost:3000/users?q=${value}`)
		//	.then((res) => {
		//		setData(res.data)
		//		setValue("");

		//	})
		//	.catch((err) => console.log(err))


	}


	const handleReset=() => {
		loadUserData();
	}


	const handleSort=async (e) => {

		let value=e.target.value;
		setSortValue(value);
		return await axios.get(`http://localhost:3000/users?_sort=${value}&_order=asc`)
			.then((res) => {
				setData(res.data)
			})
			.catch((err) => console.log(err))

	}




	const handleEditState=() => {
		console.log("Hllo"+props.identifier)
		props.setFunction(props.identifier);
		console.log("Bye"+props.identifier)
	};

	return (
		<div className='d-flex flex-column justify-content-center align-items-center bg-light '>
			<h1> User's Details</h1>
			<br></br>
			<hr />
			<div className='d-flex'>
				<div>
					<form style={{margin: "auto",padding: "15px",maxWidth: "400px",alignContent: "center"}}
						className='d-flex input-group'
						onSubmit={handleSearch}>

						<input type="text"
							className='form-control'
							placeholder='Search Here..'
							onChange={(e) => setValue(e.target.value)}
							value={value} />

						<button className='btn btn-success '>Search</button> &nbsp;
						<button onClick={() => handleReset()} className='btn btn-primary '>Reset</button>

					</form>
				</div>

				<div className='d-flex'>
					Sort By:
					<div>

						<select style={{width: "75%",borderRadius: '2px',height: "35px"}}
							onChange={handleSort}
							value={sortValue}
						>
							<option>Please select Value</option>
							{
								sortOptions.map((item,index) => (
									<option value={item} key={index}> {item}
									</option>
								))}

						</select>
					</div>

				</div>

			</div>


			<div className='w-75 rounded bg-white border shadow p-4'>
				<div className='d-flex justify-content-end'>
					<Link to={'/user/add'} className='btn btn-success' onClick={handleEditState}>Add +</Link></div>

				<table className='table table-striped'>

					<thead>
						<tr>
							<td>ID</td>
							<td>Name</td>
							<td>Email</td>
							<td>Phone</td>
							<td>Action</td>

						</tr>
					</thead>




					{/*  this is an table body  */}

					{data.length===0? (<h1 style={{textAlign: "center",color: "red"}}> No Data Found</h1>):(
						data.map((data,index) => (
							<tbody>
								<tr key={index}>
									<td> {data.id}</td>
									<td> {data.name}</td>
									<td> {data.email}</td>
									<td> {data.phone}</td>
									<td>
										<Link to={`/user/${data.id}`} className='btn btn-sm btn-info me-2 ms-2 px-3'> View </Link>
										<Link to={`/user/edit/${data.id}`} className='btn btn-sm btn-primary me-2 ms-2 px-3' onClick={handleEditState}> Edit </Link>
										{/*  delete button  */}

										<Link to={`/user/delete/${data.id}`}
											onClick={() => handleDelete(data.id)} // Call the new function
											className='btn btn-sm btn-danger me-1'
										>
											Delete
										</Link>


									</td>
								</tr>
							</tbody>
						))
					)}


				</table>
			</div>




			<br />
			{/*   this is a pagination  */}
			<Pagination
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  itemsPerPage={itemsPerPage}
  totalItems={totalItems}
>


<div className="d-flex justify-content-center mt-4">
    {currentPage > 1 && (
      <button
        className="btn btn-secondary me-2"
        onClick={() => handlePaginationClick(currentPage - 1)}
      >
        Previous
      </button>
    )}
    {currentPage < Math.ceil(totalItems / itemsPerPage) && (
      <button
        className="btn btn-secondary"
        onClick={() => handlePaginationClick(currentPage + 1)}
      >
        Next
      </button>
    )}
  </div>

</Pagination>



			{/*  this is a  delete modal */}

			{showDeleteConfirmation&&(

				<Modal
					title='Delete Details'
					open={isModelOpen}
					onOk={OnOkay}
					onCancel={OnCancel} >

					<div className='delete_modal'>
						<br />
						<p>Are you want to delete record?</p>
					</div>
				</Modal>
			)}
		</div>



	);

}


export default User