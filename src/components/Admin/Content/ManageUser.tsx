import React, { useState, useEffect } from 'react';
import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from 'react-icons/fc';
import { getAllUsers } from '../../../services/apiServices';
import TableUsers from "./TableUsers";
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from './ModalViewUser'
import ModalDeleteUser from './ModalDeleteUser';

interface ListUser {
  id: number;
  username: string;
  email: string;
  role: string;
}



const ManageUser: React.FC = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState<boolean>(false);
  const [listUsers, setListUsers] = useState<ListUser[]>([]);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<object>({});
  const [showModalViewUser, setShowModalViewUser] = useState<boolean>(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState<boolean>(false);
  const [dataDelete, setDataDelete] = useState<object>({});

  

  const fetchData = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await getAllUsers();
      if (response.EC === 0)
        setListUsers(response.DT);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClickUpdateUser = (user:object) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  }

  const handleClickViewUser = (user:object) => {
    setShowModalViewUser(true);
    setDataUpdate(user);
  }

  const handleClickDeleteUser = (user:object) => {
    console.log('Delete user', user); 
    setShowModalDeleteUser(true);
    setDataDelete(user);
  }

  const resetUpdateData = () => {
    setDataUpdate({});
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="manage-user-container">
      <div className="title">
        Manage user
      </div>
      <div className="user-content" >
        <div className="btn-add-new">
          <button className="btn btn-dark" onClick={() => setShowModalCreateUser(true)}><FcPlus /> Add New User</button>
        </div>
        <div className="table-users-container">
          <TableUsers 
          listUsers={listUsers}
          handleClickUpdateUser = {handleClickUpdateUser}
          handleClickViewUser = {handleClickViewUser}
          handleClickDeleteUser ={handleClickDeleteUser}
          />
        </div>
        <ModalCreateUser 
        show={showModalCreateUser} 
        setShow={setShowModalCreateUser} 
        fetchData={fetchData}
        />
        <ModalUpdateUser
          show={showModalUpdateUser} 
          setShow={setShowModalUpdateUser} 
          fetchData={fetchData}
          dataUpdate={dataUpdate}
          resetUpdateData={resetUpdateData}
        />
        <ModalViewUser
          show={showModalViewUser} 
          setShow={setShowModalViewUser} 
          dataUpdate={dataUpdate}
          resetUpdateData={resetUpdateData}
        />
        <ModalDeleteUser
          show={showModalDeleteUser} 
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          fetchData={fetchData}
        />
      </div>
    </div>
  )
}

export default ManageUser;
