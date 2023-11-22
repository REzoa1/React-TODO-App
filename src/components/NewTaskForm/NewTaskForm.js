import React from "react";

const NewTaskForm = ({ name }) => {
  return <input type="text" className="edit" defaultValue={name} />;
};

export default NewTaskForm;
