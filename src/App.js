
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import View from './components/Users/View'
import User from './components/Users/user'
import Add from './components/Users/Add'
import {Link} from 'react-router-dom'
import {useState} from 'react';
import Pagenotfound from './components/pagenotfound'

function App() {

  const [isEditMode,setIsEditMode]=useState(false);

  return (
    <>
      <Router>
        <div className='d-flex  text-light bg-dark  p-3'>
          <Link exact to={'/user'} className='list'>  User </Link> &nbsp; &nbsp; &nbsp;
          <Link exact to={'/'} className='list'> Home  </Link>
        </div>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/user' element={<User setFunction={setIsEditMode} identifier={isEditMode} />} />
          <Route exact path='/user/:id' element={<View setFunction={setIsEditMode} identifier={isEditMode} />} />
          <Route exact path='/user/add' element={<Add identifier={isEditMode} />} />
          <Route exact path='/user/edit/:id' element={<Add identifier={isEditMode} />} />
          <Route exact path='/user/delete/:id' element={<User />} />
          <Route exact path='*' element={<Pagenotfound />} />

        </Routes>

      </Router>
    
    </>
  )
}

export default App
