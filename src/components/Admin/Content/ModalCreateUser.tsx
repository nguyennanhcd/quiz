import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Slide } from 'react-toastify';

interface ModalCreateUserProps {
  show: boolean;
  setShow: (show:boolean) => void;
}


function ModalCreateUser({show, setShow}: ModalCreateUserProps) {

  const handleClose = () => {
    setShow(false)
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
  };

  
  const validateEmail = (email:string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const  validatePassword = (password:string) => {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    return re.test(password);
  }

  const handleSubmitCreateUser = async() => {
    // validate email
    const isValidateEmail = validateEmail(email); 
    if(!isValidateEmail)
      {
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

      //validate password
      const isValidatePassword = validatePassword(password);
      if(!isValidatePassword)
      {
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

    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    // khi sử dụng file thì bắt buộc phải truyền thông qua form data

    const res = await axios.post('http://localhost:8081/api/v1/participant', data)
    console.log(res.data);
    if( res.data && res.data.EC === 0)
      {
        toast.success(res.data.EM, {
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
      }
    
    if( res.data && res.data.EC !==0)
      {
        toast.error(res.data.EM, {
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
  }

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("USER");
  const [image, setImage] = useState<string | File >("");
  const [previewImage, setPreviewImage] = useState<string >("");

  const handleUploadImage = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } 
    // else {
    //   setPreviewImage(undefined);
    // }
  }

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
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3">

  <div className="col-md-11">
    <label
    htmlFor="inputEmail"
    className="form-label"
    >
        Email
    </label>
    <input 
    type="email" 
    className="form-control" 
    id="inputEmail" 
    placeholder='Email'
    onChange={(event) => setEmail(event.target.value)}
    value={email}/>
  </div>


  <div className="col-md-11">
    <label 
    htmlFor="inputPassword" 
    className="form-label"
    >
        Password
    </label>
    <input 
    type="password" 
    className="form-control" 
    id="inputPassword"
    placeholder= "Password"
    onChange={(event) => setPassword(event.target.value)}
    value={password}
    />
  </div>


  <div className="col-md-6">
    <label 
    htmlFor="inputUsername" 
    className="form-label"
    >
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
    <label 
    htmlFor="inputRole" 
    className="form-label"
    >
        Role
    </label>
    <select id="inputRole" className="form-select" onChange={(event) => setRole(event.target.value)}>
      <option value="USER" >USER</option>
      <option value="ADMIN">ADMIN</option>
    </select>
  </div>
  <div className='col-md-12'>
    <label htmlFor="file" className='form-lable label-upload'>
        <FcPlus/> Upload File Image
    </label>
    <input 
    type="file" 
    id='file' 
    hidden
    onChange={(event) => handleUploadImage(event)}
    />
  </div>
  <div className='col-md-12 img-preview' >
        {previewImage ? <img src={previewImage} /> : <span>Image Preview</span> } 
  </div>
</form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateUser;
