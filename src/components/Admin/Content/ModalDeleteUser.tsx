import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiServices';
import { toast, Slide } from 'react-toastify';

interface DataDelete {
    id:string;
    email:string;
    username:string;
    role:string;
    image:string|File;
    previewImage:string;
  }

interface ModalDeleteUserProps {
    show:boolean;
    setShow:(show:boolean) => void;
    dataDelete:DataDelete;
    fetchData: () => Promise<void>;
}

function ModalDeleteUser({show, setShow, dataDelete, fetchData}: ModalDeleteUserProps) {

  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async () => {
    const data = await deleteUser(dataDelete.id) as any;
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
  }

  return (
    <>

      <Modal 
      show={show} 
      onHide={handleClose}
      backdrop="static" 
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm deleting user</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete the user which has <b> {dataDelete && dataDelete.email ? dataDelete.email : '' } </b> email ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleSubmitDeleteUser()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;