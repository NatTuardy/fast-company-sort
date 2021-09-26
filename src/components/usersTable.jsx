import React from "react";
import PropTypes from "prop-types";
// import Users from "./users";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import BookMark from "./bookmark";

const UsersTable = ({ userCrop, onSort, currentSort, onToggle, onDelete, ...rest }) => {
  //   const handleSort = (item) => {
  //     if (currentSort.path === item) {
  //       onSort((currentSort) => ({ ...currentSort, order: currentSort.order === "asc" ? "desc" : "asc" }));
  //     } else {
  //       onSort({ path: item, order: "asc" });
  //     }
  //   };
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: { name: "Качества" },
    professions: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <BookMark status={user.status} onToggle={() => onToggle(user._id)} />
      ),
    },
    delete: {
      component: (user) => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(user._id)}
        >
          delete
        </button>
      ),
    },
  };

  return (
    <table className="table">
      <TableHeader
        selectedSort={currentSort}
        onSort={onSort}
        columns={columns}
      />
      <TableBody {...{ columns, data: userCrop }} />
      {/* <tbody>
        <Users users={userCrop} {...rest} />
      </tbody> */}
    </table>
  );
};

UsersTable.propTypes = {
  userCrop: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  currentSort: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default UsersTable;
