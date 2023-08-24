import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link,useNavigate, useParams} from 'react-router-dom'
import  {Modal} from 'antd' ;

function User(props) {
	// this is for the edit button

	const [editMode, setEditMode] = useState({});
  const [editedData, setEditedData] = useState({});

// this is for the  delete button
const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(true);
const [isModelOpen , setIsModelOpen]  = useState(false);
const [deluser , setDeluser] = useState();

// this is for the modal



	const [data,setData]=useState([]);
	const [value,setValue]=useState("");
	const [sortValue,setSortValue]=useState("");
	const [currentPage,setCurrentPage]=useState(0);
	const [pageLimit]=useState(6);
	const navigate=useNavigate();
	const {id} = useParams();
	const sortOptions=["name","email","phone"];



	const AddUSer  = (newData) =>{
  setData((prev) =>[...prev,newData]);
	}





// this is for the modal function

const OnOkay  = ()  =>{
handleDelete(+id);
setIsModelOpen(false)
navigate('/user')
}

const OnCancel =  () =>{
	setIsModelOpen(false)
	navigate('/user')

}


	// edit mode function

	const toggleEditMode = (id) => {
		setEditMode((prevMode) => ({
			...prevMode,
			[id]: !prevMode[id],
		}));
	};

	const handleEditChange = (id, field, value) => {
		setEditedData((prevData) => ({
			...prevData,
			[id]: {
				...prevData[id],
				[field]: value,
			},
		}));
	};

	const saveEditedData = (id) => {
		const editedItem = editedData[id];
		axios
			.put(`http://localhost:3000/users/${id}`, editedItem)
			.then(() => {

				loadUserData(currentPage * pageLimit, (currentPage + 1) * pageLimit, 0);
				setEditMode((prevMode) => ({
					...prevMode,
					[id]: false,
				}));
			})
			.catch((error) => {
				console.log(error);
			});
	};


	//________________________________________________________________
	//________________________________________________________________



	//const navigate = useNavigate();

	useEffect(() => {
		loadUserData();
	},[data])


	const loadUserData=async () => {

		return await axios.get(`http://localhost:3000/users/`)
			.then(result => {
				setData(result.data);
				setCurrentPage()
			})
	.catch(err => console.log(err))
	}


	// handleDelete

	const handleDelete=() => {

		const mydeldata  = data.filter((val) =>val.id === +id)
		console.log(mydeldata	)
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
		return await axios.get(`http://localhost:3000/users?q=${value}`)
		 .then((res) => {
				setData(res.data)
				setValue("");

			})
			.catch((err) => console.log(err))
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


	const handleFilter=async (value) => {

		return await axios.get(`http://localhost:3000/users?status=${value}&_order=asc`)
			.then((res) => {
				setData(res.data)

			})
			.catch((err) => console.log(err))

	}


	const handleEditState = () => {
		console.log("Hllo" + props.identifier)
		props.setFunction(props.identifier);
		console.log("Bye" + props.identifier)
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

						{/*<label for="cars"> Sort Details</label> &nbsp;*/}

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


					{/*  Filter data pending  */}
					<div>
						Filter By: &nbsp;&nbsp;
						<button className='btn btn-secondary' onClick={() => handleFilter("Renu")}> Email</button> &nbsp;
						<button className='btn btn-warning' onClick={() => handleFilter("Maya")}> Name</button>
					</div>

				</div>

			</div>


			<div className='w-75 rounded bg-white border shadow p-4'>
				<div className='d-flex justify-content-end'>
					<Link to={'/user/add'}  className='btn btn-success' onClick={handleEditState}>Add +</Link></div>

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

										{/*<Link to={`/user/delete/${data.id}`} onClick={e => handleDelete(data.id)} className='btn btn-sm btn-danger  me-1'> Delete</Link>*/}

									</td>
								</tr>
							</tbody>
						))
						)}


				</table>


			</div>
 {/*   this is a pagination  */}






{/*  this is a  delete modal */}



 {showDeleteConfirmation && (

<Modal

 title= 'Delete Details'
 open = {isModelOpen}
 onOk = {OnOkay}
 onCancel = {OnCancel} >
			   {/*<div className='modal'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>

                <h5 className='modal-title'>Confirm Delete</h5>


                <button
                  type='button'
                  className='close'
                  onClick={() => setShowDeleteConfirmation(false)} // Close the modal
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                Are you sure you want to delete this user?
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => setShowDeleteConfirmation(false)} // Close the modal
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={() => {
                    setShowDeleteConfirmation(false); // Close the modal
                    // Perform delete action here...
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>*/}


 <div  className='delete_modal'>
	<br />

	{/*Name : <h2>{data.name}</h2>
	Email : <h2>{data.email}</h2>
	Phone : <h2>{data.phone}</h2>*/}

  <p>Are you want to delete record?</p>
   </div>
		 </Modal>
      )}

		</div>
	);



}
export default User