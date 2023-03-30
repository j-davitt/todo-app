import { useContext, useState } from "react";
import { SettingsContext } from "../../Context/Settings";
import { Button, Checkbox, createStyles, Grid, NumberInput, TextInput } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  h1: {
    backgroundColor: theme.colors.gray[8],
    color: theme.colors.gray[0],
  },
  div: {
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: theme.spacing.md,
  },
  section: {
    border: `3px solid ${theme.colors.gray[8]}`,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.md,
  }
}));



const Settings = (props) => {
  const { classes } = useStyles();

  const { pageItems, showCompleted, sort, setSort, setPageItems, setShowCompleted, saveLocalStorage } = useContext(SettingsContext);

  const [showUpdate, setShowUpdate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowUpdate(true);
    saveLocalStorage();
  };


  return (
    <>

      <h1 className={classes.h1}>Manage Settings</h1>
      <div className={classes.div}>
        <section className={classes.section}>
        <h3>Update Settings</h3>
          <form onSubmit={handleSubmit} className={classes.form} >
            <Checkbox 
            label="Show Completed?"
            checked={showCompleted} 
            onChange={(e) => setShowCompleted(e.target.checked)}
            />
            
            <NumberInput 
            label="Items per page"
            placeholder="3"
            value={pageItems} 
            onChange={(e) => setPageItems(e.target.value)}
            name="pageItems"
            />
            <TextInput  
            label="Sort by"
            placeholder="difficulty"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            />

            <Button type="submit">Update Settings</Button>
          </form>
        </section>
        {showUpdate &&
          <section className={classes.section}>
            <h3>Updated Settings</h3>
            <p>Show Completed: {showCompleted ? 'yes' : 'no'}</p>
            <p>Items per page: {pageItems}</p>
            <p>Sort by: {sort}</p>
          </section>}
      </div>
    </>
  )

}

export default Settings;
