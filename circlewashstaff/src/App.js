import React, {useState, useMemo, Fragment, useEffect} from 'react';
import OwnerDashBoard from './components/ownerDashBoard/index';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignUp from './components/signUp/index';
import SignIn from './components/signIn/index';
import SuccessSignUp from './components/successSignUp/index';
import ManageStaff from './components/manageStaff/index';
import PendingStaff from './components/pendingStaff/index';
import CaseList from './components/caseList/index';
import Profile from './components/profile/index';
import CaseDashboard from './components/caseDashboard/index';
import MachineStat from './components/machineStat/index';
import CaseRequest  from './components/caseRequest/index';
import {ProtectedRoute} from './path/protectedRoute';
import axios from 'axios';
import localstorageService from './services/localstorageService';

function App() {
  const [user, setUser] = useState();

  // const providerValue = useMemo(() => ({user, setUser}), [user, setUser]);
  //prevents provider value changing unless user and setUser changes

  useEffect(async () => {
    const token = await localstorageService.getLogInInfoWithExpiry('token');
    if (token !== null) {
      axios({
        method: 'get',
        headers: { Authorization: `Bearer ${token}` },
        url: 'http://localhost:8000/employee/profile'
    })
    .then((res) => {
      setUser(res.data)
    })
    .catch((error) => {
      console.log(error);
    })
    }
  }, []);

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path='/signup/success' exact element={<SuccessSignUp />} />
          <Route path='/signup' exact element={<SignUp /> } /> 
          <Route path='/signin' exact element={<SignIn />} />
          <Route path='/' exact element={<OwnerDashBoard />} />
          <Route path='/case' exact element={<CaseList />} />
          <Route path='/profile' exact element={<Profile />} />
          {(user) && 
          <Route exact path='/pendingstaff' element={<ProtectedRoute user={user} role="admin"/>}>
            <Route exact path='/pendingstaff' element={<PendingStaff />} />
          </Route>}
          {(user) && 
          <Route exact path='/managestaff' element={<ProtectedRoute user={user} role="admin"/>}>
            <Route exact path='/managestaff' element={<ManageStaff />} />
          </Route>}
          {(user) && 
          <Route exact path='/case/request' element={<ProtectedRoute user={user} role="admin"/>}>
            <Route exact path='/case/request' element={<CaseRequest />} />
          </Route>}
          <Route path='/machine/stats/' exact element={<MachineStat />} />
          <Route path='/case/dashboard/:tap/:id' exact element={<CaseDashboard />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
