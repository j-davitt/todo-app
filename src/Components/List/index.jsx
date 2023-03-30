import { useContext, useState } from "react";
import { SettingsContext } from "../../Context/Settings";
import { Badge, Card, Group, Pagination, Text } from '@mantine/core';
import Auth from "../Auth";
import { Else, If, Then } from "react-if";
import { LoginContext } from '../../Context/Auth';


const List = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const { loggedIn, can } = useContext(LoginContext);

  const { pageItems, showCompleted } = useContext(SettingsContext);

  const totalPages = Math.ceil(props.list.length / pageItems);

  const displayItems = showCompleted
    ? props.list
    : props.list.filter((item) => !item.complete);


  const firstItem = (currentPage - 1) * pageItems;
  const lastItem = currentPage * pageItems;
  const finalDisplayItems = displayItems.slice(firstItem, lastItem);

  return (
    <>
      {/* <If condition={loggedIn}>
        <Then> */}
          {finalDisplayItems.map((item, idx) => (
            <Card key={item._id} shadow="sm" padding="md" margin="md">
              <Card.Section>
                <Group position="apart">
                <If condition={loggedIn && can('update')}>
                <Then>
                  <Badge
                  onClick={() => props.toggleComplete(item._id)}
                  color={item.complete ? 'green' : 'red'}
                  >
                    {item.complete ? 'Complete' : 'Pending'}
                  </Badge>
                </Then>
                <Else>
                <Badge
                  color={item.complete ? 'green' : 'red'}
                  >
                    {item.complete ? 'Complete' : 'Pending'}
                  </Badge>
                </Else>
              </If>
              <Auth capability="delete">
                <button onClick={() => props.deleteItem(item._id)}>X</button>
              </Auth>
                  
                </Group>
              <Text>Assigned to: {item.assignee}</Text>
              </Card.Section>
              <Text>{item.text}</Text>
              <Text>Difficulty: {item.difficulty}</Text>
              
            </Card>
          ))}
        {/* </Then>

      </If> */}

      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={(value) => setCurrentPage(value)}
      />

    </>

  )

}

export default List;