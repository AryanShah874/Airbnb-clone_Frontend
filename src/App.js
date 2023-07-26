import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import UserState from './context/UserState';
import Account from './pages/Account';
import Places from './pages/Places';
import PlacesForm from './pages/PlacesForm';
import PlacePage from './pages/PlacePage';
import Footer from './pages/Footer';
import Bookings from './pages/Bookings';
import FilterState from './context/FilterState';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <div className="px-8 py-2 flex flex-col min-h-screen">
        <BrowserRouter>
          <UserState>
            <FilterState>
              <Header />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/account' element={<Account />} />
                <Route path='/account/bookings' element={<Bookings />} />
                <Route path='/account/places' element={<Places />} />
                <Route path='/account/places/new' element={<PlacesForm />} />
                <Route path='/account/places/:id' element={<PlacesForm />} />
                <Route path='/place/:id' element={<PlacePage />} />
              </Routes>
              <Footer />
            </FilterState>
          </UserState>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
