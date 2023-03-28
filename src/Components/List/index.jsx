import { useContext, useState } from "react";
import { SettingsContext } from "../../Context/Settings";
import { Pagination } from '@mantine/core';


const List = (props) => {

  const [currentPage, setCurrentPage] = useState(1);

  const { pageItems, showCompleted, sort } = useContext(SettingsContext);

  const totalPages = Math.ceil(props.list.length / pageItems);

  const displayItems = showCompleted 
    ? props.list
    : props.list.filter((item) => !item.complete);


  const firstItem = (currentPage - 1) * pageItems;
  const lastItem = currentPage * pageItems;
  const finalDisplayItems = displayItems.slice(firstItem, lastItem);

  return (
    <>
      {finalDisplayItems.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
        </div>
      ))}

      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={(value) => setCurrentPage(value)}
      />

    </>

  )

}

export default List;