import ModalCreateUser from "./ModalCreateUser"
import "./ManageUser.scss"
import { FcPlus } from 'react-icons/fc';
import { useState } from "react";


const ManageUser:React.FC = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState<boolean>(false)

  return (
    <div className="manage-user-container">
      <div className="title">
        Manage user
      </div>
      <div className="user-content" >
        <div className="btn-add-new">
            <button className="btn btn-dark" onClick={() => setShowModalCreateUser(true)}><FcPlus/> Add New User</button>
        </div>
        <div className="table-users-container">
          tabel users
        </div>
            <ModalCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser}/>
      </div>
    </div>
  )
}

export default ManageUser
