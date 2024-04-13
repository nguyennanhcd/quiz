import React, { useState, ChangeEvent, useEffect, KeyboardEventHandler } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast, Slide } from 'react-toastify';
import { postUpdateUser } from "../../../services/apiServices";
import _ from "lodash";

interface DataUpdate {
  id:string;
  email:string;
  username:string;
  role:string;
  image:string|File;
  previewImage:string;
}

interface ModalCreateUserProps {
  show: boolean;
  setShow: (show: boolean) => void;
  fetchData: () => Promise<void>
  dataUpdate: DataUpdate;
  resetUpdateData: () => void;
}


const ModalUpdateUser: React.FC<ModalCreateUserProps> = ({ show, setShow, fetchData, dataUpdate, resetUpdateData }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("USER");
  const [image, setImage] = useState<string | File>("");
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
    setRole(dataUpdate.role);
    setImage("");
    setPreviewImage("");
    resetUpdateData();
  };

  const validateEmail = (email: string): boolean => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) !== null;
  };

  const handleSubmitUpdateUser = async (): Promise<void> => {
    // validate email
    const isValidateEmail: boolean = validateEmail(email);
    if (!isValidateEmail ) {
      toast.error("invalid email", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide
      });
      return;
    }

    const data = await postUpdateUser(dataUpdate.id, username, role, image) as any;
    console.log("component res: ", data);
    if (data && data && data.EC === 0) {
      toast.success(data.EM, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide
      });
      handleClose();
      await fetchData();
    }

    if (data && data && data.EC !== 0) {
      toast.error(data.EM, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide
      });
    }
  };

  const handleSubmitUpdateUserEnter:KeyboardEventHandler<HTMLButtonElement> = (event) => {
    console.log(event)
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmitUpdateUser();
    }
  };


  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
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
        onKeyDown={handleSubmitUpdateUserEnter}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
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
                disabled
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
                disabled
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
              <select id="inputRole" className="form-select" onChange={(event) => setRole(event.target.value)} >
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
                onChange={(event) => handleUploadImage(event)}
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
          <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
