import React from 'react';

interface ListUser {
  id: number;
  username: string;
  email: string;
  role: string;
}


interface TableUserPaginateProps {
  listUsers: ListUser[];
  handleClickUpdateUser:(user: ListUser) =>void;
  handleClickViewUser:(user:object) => void;
  handleClickDeleteUser:(user:object) => void;
}

  const TableUserPaginate: React.FC<TableUserPaginateProps> = ({ listUsers, handleClickUpdateUser, handleClickViewUser, handleClickDeleteUser  }) => {
  return (
    <table className="table table-hover table-responsive table-bordered">
      <thead>
        <tr>
          <th scope="col">ID </th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope='col'>Action</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length > 0 && listUsers.map((user, index) => (
          <tr key={index}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button className='btn btn-secondary' onClick={() => handleClickViewUser(user)}>View</button>
              <button className="btn btn-success mx-3" onClick={() => handleClickUpdateUser(user)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleClickDeleteUser(user)}>Delete</button>
            </td>
          </tr>
        ))}
        {listUsers && listUsers.length === 0 &&
          <tr>
            <td colSpan={4}>
              Not found data
            </td>
          </tr>}
      </tbody>
    </table>
  )
}

export default TableUserPaginate;
