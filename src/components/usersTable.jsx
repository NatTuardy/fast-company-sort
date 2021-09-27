import React from "react";
import PropTypes from "prop-types";
// import TableHeader from "./tableHeader";
// import TableBody from "./tableBody";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UsersTable = ({
  userCrop,
  onSort,
  currentSort,
  onToggle,
  onDelete,
  ...rest
}) => {
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: {
      name: "Качества",
      component: (user) => <QualitiesList qualities={user.qualities} />,
    },
    professions: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <BookMark status={user.bookmark} onToggle={() => onToggle(user._id)} />
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
    <Table selectedSort={currentSort}
      onSort={onSort}
      columns={columns}
      data={userCrop}
    />
    // <Table>
    //   <TableHeader
    //     selectedSort={currentSort}
    //     onSort={onSort}
    //     columns={columns}
    //   />
    //   <TableBody {...{ columns, data: userCrop }} />
    // </Table>
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
