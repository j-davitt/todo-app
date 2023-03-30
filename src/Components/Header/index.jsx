import { createStyles, Header, Navbar, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import Login from "../Login";

const useStyles = createStyles((theme) => ({
  nav: {
    backgroundColor: theme.colors.blue[6],
    height: '100%',
    
  },
  link: {
    color: theme.colors.gray[0],
    textDecoration: 'none',
    padding: theme.spacing.md,
  }
}))

const HeaderComp = (props) => {
  const { classes } = useStyles();


  return (

    <Header >
      <Navbar className={classes.nav}>
        <Group>
          <Link className={classes.link} to='/'>Home</Link>
          <Link className={classes.link} to='/settings'>Settings</Link>
          <Login />
        </Group>   
      </Navbar>
    </Header>

  );
}


export default HeaderComp;
