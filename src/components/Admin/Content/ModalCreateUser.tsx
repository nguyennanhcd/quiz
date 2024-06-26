import React, { useState, ChangeEvent, KeyboardEventHandler } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast, Slide } from 'react-toastify';
import { postCreateNewUser } from "../../../services/apiServices";

interface ModalCreateUserProps {
  show: boolean;
  setShow: (show: boolean) => void;
  fetchData: () => Promise<void>
}

const ModalCreateUser: React.FC<ModalCreateUserProps> = ({ show, setShow, fetchData }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("USER");
  const [image, setImage] = useState<string | File>("");
  const [previewImage, setPreviewImage] = useState<string>("");

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
  };

  const validateEmail = (email: string): boolean => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) !== null;
  };

  const validatePassword = (password: string): boolean => {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  };

  const handleSubmitCreateUser = async (): Promise<void> => {
    // validate email
    const isValidateEmail: boolean = validateEmail(email);
    if (!isValidateEmail) {
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

    // validate password
    const isValidatePassword: boolean = validatePassword(password);
    if (!isValidatePassword) {
      toast.error("Invalid password", {
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

    const data = await postCreateNewUser(email, password, username, role, image) as any;
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

  const handleSubmitCreateUserEnter:KeyboardEventHandler<HTMLButtonElement> = (event) => {
    console.log(event)
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmitCreateUser();
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
        onKeyDown={handleSubmitCreateUserEnter}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
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
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}  onKeyDown={handleSubmitCreateUserEnter}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
