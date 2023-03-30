import { useContext, useState } from "react";
import { SettingsContext } from "../../Context/Settings";
import { Pagination } from '@mantine/core';
import Auth from "../Auth";
import { Else, If, Then } from "react-if";
import { LoginContext } from '../../Context/Auth';


const List = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const { loggedIn, can } = useContext(LoginContext);

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
      <If condition={loggedIn}>
        <Then>
          {finalDisplayItems.map(item => (
            <div key={item.id}>
              <p>{item.text}</p>
              <p><small>Assigned to: {item.assignee}</small></p>
              <p><small>Difficulty: {item.difficulty}</small></p>
              <If condition={loggedIn && can('update')}>
                <Then>
                  <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
                </Then>
                <Else>
                  <div>Complete: {item.complete.toString()}</div>
                </Else>
              </If>
              <Auth capability="delete">
                <button onClick={() => props.deleteItem(item.id)}>Delete</button>
              </Auth>
            </div>
          ))}
        </Then>

      </If>

      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={(value) => setCurrentPage(value)}
      />

    </>

  )

}

export default List;