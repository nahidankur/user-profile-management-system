import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from "./component/Navbar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from './pages/Dashboard'
import ProfileDetails from './pages/ProfileDetails'
import EditProfileForm from './pages/EditProfileForm'
import CreateProfileForm from './pages/CreateProfileForm'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  // const dispatch = useDispatch()
  // window.addEventListener('beforeunload', () => {
  //   dispatch(removeUser())
  // }); for remove user and log out when refreshing tab or close window. Currently Disabled
  return (
<>
<Router>
<Navbar />
  <Routes>
    <Route path='/' element={<Register />} />
    <Route path='/login' element={<Login />} />
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/create' element={<CreateProfileForm />} />
    <Route path='/edit/:id' element={<EditProfileForm />} />
    <Route path='/profile/:id' element={<ProfileDetails />} />
  </Routes>
</Router>
<ToastContainer/>

</>
  );
}
export default App
