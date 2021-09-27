import React, { useState, useEffect } from "react";
// import Users from "./components/users.jsx";
import SearchStatus from "../components/searchStatus";
import api from "../api/index";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import GroupList from "../components/groupList.jsx";
import UsersTable from "../components/usersTable.jsx";
import _ from "lodash";

const Users = () => {
  const [users, setUsers] = useState();
  // console.log(`users9`, users);
  const [professions, setProfessions] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  useEffect(() => {
    api.users.fetchAll().then((date) => setUsers(date));
    api.professions.fetchAll().then((date) => setProfessions(date));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookmark = (id) => {
    // console.log(id);
    const newArr = users.map((user) => {
      // console.log("2", user);
      return user._id === id ? { ...user, bookmark: !user.bookmark } : user;
    });
    setUsers(newArr);
  };

  const handleSort = (item) => {
    // console.log(`item`, item);
    setSortBy(item);
  };
  const handleProfessionsSelect = (item) => {
    setSelectedProf(item);
  };

  // pagination
  const pageSize = 8;
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  let filterUsers;
  let sortUsers;
  let lengthUser;
  let userCrop;
  if (users) {
    // console.log("users", users);
    if (Array.isArray(professions)) {
      filterUsers = selectedProf ? users.filter((user) => { return user.profession.name === selectedProf.name; }) : users;
    } else {
      filterUsers = selectedProf ? users.filter((user) => { return (JSON.stringify(user.profession) === JSON.stringify(selectedProf)); }) : users;
    }
    lengthUser = filterUsers.length;
    sortUsers = _.orderBy(filterUsers, [sortBy.path], [sortBy.order]);
    userCrop = paginate(sortUsers, currentPage, pageSize);
  }

  const clearFilter = () => {
    setSelectedProf();
  };

  const renderTable = () => {
    return (
      <>
        <div className="d-flex">
          {professions && (
            <div className="d-flex flex-column flex-shrink-0 p-3">
              <GroupList
                selectedItem={selectedProf}
                items={professions}
                onItemSelect={handleProfessionsSelect}
              />
              <button onClick={clearFilter} className="btn btn-secondary mt-2">
                Очистить
              </button>
            </div>
          )}
          <div className="d-flex flex-column">
            <SearchStatus number={lengthUser} />
            <UsersTable
              userCrop={userCrop}
              onSort={handleSort}
              currentSort={sortBy}
              onDelete={handleDelete}
              onToggle={handleToggleBookmark}
            />
            <div className="d-flex justify-content-center">
              <Pagination
                length={lengthUser}
                pageSize={pageSize}
                onPage={handleChangePage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      {!users ? (
        <h4>
          <span className="badge m-2 h-12 bg-danger">
            Никто не тусанет с тобой сегодня
          </span>
        </h4>
      ) : (
        renderTable()
      )}
    </div>
  );
};
export default Users;
