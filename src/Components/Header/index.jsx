import { createStyles } from "@mantine/core";
import { Link } from "react-router-dom";


const useStyles = createStyles((theme) => ({
  h1: {
    backgroundColor: theme.colors.blue[6],
    height: '100%',
    margin: 'auto',
    color: 'white',
  }
}))

const Header = (props) => {
  const { classes } = useStyles();

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/settings'>Settings</Link>
        </li>
      </ul>
    </nav>
  );
}


export default Header;
