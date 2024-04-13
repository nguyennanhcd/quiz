import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import _ from "lodash";


interface DataUpdate {
    id:number;
    email:string;
    username:string;
    role:string;
    image:string|File;
    previewImage:string;
  }

interface ModalViewUser {
  show: boolean;
  setShow: (show: boolean) => void;
  dataUpdate: DataUpdate;
  resetUpdateData: () => void;
}

const ModalCreateUser: React.FC<ModalViewUser> = ({ show, setShow, dataUpdate, resetUpdateData }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [, setRole] = useState<string>("USER");
  const [, setImage] = useState<string | File>("");
  const [previewImage, setPreviewImage] = useState<string>("");

  useEffect(() => {
    if(!_.isEmpty(dataUpdate)) 
    {
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      setImage("");
      if(dataUpdate.image)
      {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
      console.log(dataUpdate)
    }
  },[dataUpdate])

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
    resetUpdateData();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        className='modal-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>View User Information</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-11">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder='Email'
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
            </div>
            <div className="col-md-11">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputUsername" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="inputUsername"
                placeholder='Username'
                onChange={(event) => setUsername(event.target.value)}
                value={username}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputRole" className="form-label">
                Role
              </label>
              <select id="inputRole" className="form-select" onChange={(event) => setRole(event.target.value)}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className='col-md-12'>
              <label htmlFor="file" className='form-lable label-upload'>
                <FcPlus /> Upload File Image
              </label>
              <input
                type="file"
                id='file'
                hidden
              />
            </div>
            <div className='col-md-12 img-preview' >
              {previewImage ? <img src={previewImage} alt="Preview" /> : <span>Image Preview</span>}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
