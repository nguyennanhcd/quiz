import axios from "../utils/axiosCustomize"; // ở đây chính là import instance


const postCreateNewUser = (email:string, password:string, username:string, role:string, image: File | string) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    // khi sử dụng file thì bắt buộc phải truyền thông qua form data
  return axios.post('api/v1/participant', data)
}

const getAllUsers = () => {
  return axios.get('api/v1/participant/all')
}

const postUpdateUser = (id: string, username:string, role:string, image: File | string) => {
  const data = new FormData();
  data.append('id', id);
  data.append('username', username);
  data.append('role', role);
  data.append('userImage', image);
  // khi sử dụng file thì bắt buộc phải truyền thông qua form data
return axios.put('api/v1/participant', data)
}

const deleteUser = (userId: string): Promise<void> => {
  return axios.delete('api/v1/participant', {data: {id: userId }})
}


export{ postCreateNewUser, getAllUsers, postUpdateUser, deleteUser }
