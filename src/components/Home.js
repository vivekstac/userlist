import { useEffect, useState } from "react";
import Header from "../components/Header";
import TableView from "../components/TableView";
import ListView from "../components/CardView";
import CreateNewModal from "./CreateNewModal"
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import tableView from "../assets/img/table_view.svg";
import listView from "../assets/img/list_view.svg";
import tableViewActive from "../assets/img/table_view-active.svg";
import listViewActive from "../assets/img/list_view-active.svg";
import searchIcon from "../assets/img/search_icon.svg"

const API = "http://localhost:5000/users";
const USER_API = "https://6934141f4090fe3bf01ed750.mockapi.io/vivek/userlist/userdata"

export default function Home() {
  const [users, setUsers] = useState([]);
  const [view, setView] = useState("table");
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [form, setForm] = useState({ id: null, firstNam: "", email: "" });
  const [errors, setErrors] = useState({})

  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const reset = () => {
    setIsRequesting(false);
    setIsCreate(false)
    setIsEdit(false)
    setIsDelete(false)
    setErrors({})
    setSearchText('')
  }

  const loadUsers = async () => {
    setIsRequesting(true);
    const res = await fetch(USER_API);
    const data = await res.json();
    setUsers(data);
    setFilteredUsers(data)
    reset()
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearch = () => {
    const filtered = users.filter((u) =>
      u.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      u.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      u.email.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  const validataUserData = (form) => {
    const errors = {};

    for (let key in form) {
      const value = form[key].trim();

      if (!value) {
        errors[key] = `${key} is required`;
        continue
      }
    }

    return errors;
  };

  const addUser = async (data) => {
    const validationErrors = validataUserData(data);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    await fetch(USER_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${data?.firstName} ${data?.lastName}`,
        email: data?.email,
        firstName: data?.firstName,
        lastName: data?.lastName,
        avatar: data?.avatar,
      }),
    });

    setForm({ id: null, name: "", email: "" });
    loadUsers();
  };

  const editUsers = (user) => {
    const filtered = users.find((u) => u.id === user);
    setEditUser(filtered);
  };

  const updateUser = async (data) => {
    await fetch(`${USER_API}/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setIsEdit(false);
    loadUsers();
  };

  const deleteUsers = async (id) => {
    await fetch(`${USER_API}/${id}`, { method: "DELETE" });
    loadUsers();
  };

  const handleDeleteModal = (user) => {
    const filtered = users.find((u) => u.id === user);
    setDeleteUser(filtered)
    setIsDelete(!isDelete)
  }

  const handleOpenModal = () => {
    setIsCreate(!isCreate)
  }

  const handleEditModal = (user) => {
    const filtered = users.find((u) => u.id === user);
    setEditUser(filtered);
    setIsEdit(!isEdit)

  }

  return (
    <div className="main-container">
      <Header />

      <div className="content-container">
        {isRequesting ? (
          <div className="loading-container" fluid>
            <h3>Loading...</h3>
          </div>
        ) : (
          <div className="main-body">
            <div className="body-box user-page">
              <div className="title-row">
                <h2>Users</h2>
                <div className="search-bar-main right-controls">
                  <div className="search-box">
                    <input
                      placeholder="input search text"
                      value={searchText}
                      name="Search"
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <img onClick={() => handleSearch()} src={searchIcon} alt={"search icon"} className="search-icon" />

                  </div>
                  <button onClick={() => handleOpenModal()} className="btn-create">Create User</button>
                </div>
              </div>
              <div className="view-toggle">
                <button className={`${view === "table" ? "active" : ""}`} onClick={() => setView("table")}>
                  <img src={`${view === "table" ? tableViewActive : tableView}`} alt="table view icon" />Table
                </button>

                <button className={`${view !== "table" ? "active" : ""}`} onClick={() => setView("list")}>
                  <img src={`${view !== "table" ? listViewActive : listView}`} alt="list view icon" />
                  Card
                </button>
              </div>
              {view === "table" ? (
                <TableView data={filteredUsers} onEdit={handleEditModal} onDelete={handleDeleteModal} setDeletedUser={editUsers} />
              ) : (
                <ListView data={filteredUsers} onEdit={handleEditModal} onDelete={handleDeleteModal} />
              )}
            </div>
          </div>


        )}
      </div>

      {isCreate && <CreateNewModal
        show={!!isCreate}
        url={USER_API}
        errors={errors}
        setErrors={setErrors}
        onClose={() => setIsCreate(!isCreate)}
        onUpdated={addUser}
      />}
      {isEdit && <EditModal
        show={!!isEdit}
        user={editUser}
        url={USER_API}
        errors={errors}
        setErrors={setErrors}
        onClose={() => setIsEdit(!isEdit)}
        onUpdated={updateUser}
      />}

      {isDelete && <DeleteModal
        show={isDelete}
        user={deleteUser}
        url={USER_API}
        onClose={() => setIsDelete(!isDelete)}
        onDeleted={deleteUsers}
      />}
    </div>
  );
}
