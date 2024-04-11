import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  BrowserRouter,
  Routes,
  Route 
} from 'react-router-dom';
import User from './components/User/User.tsx';
import Admin from './components/Admin/Admin.tsx';
import HomePage from "./components/Home/HomePage"
import Dashboard from './components/Admin/Content/Dashboard.tsx';
import ManageUser from './components/Admin/Content/ManageUser.tsx';

//khi 1 route có index nghĩa là mặc định route đó sẽ hiện thị như 1 outlet khi k có route tương ứng
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<HomePage/>}/>
          <Route path='users' element={<User/>}/>
        </Route>
        <Route path='/admins' element={<Admin/>}>
        <Route index element={<Dashboard/>}/>
        <Route path='manage-users' element={<ManageUser/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
