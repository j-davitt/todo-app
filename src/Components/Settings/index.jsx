import { useContext } from "react";
import { SettingsContext } from "../../Context/Settings";


const Settings = (props) => {

  const { pageItems, showCompleted, sort, setSort, setPageItems, setShowCompleted, saveLocalStorage } = useContext(SettingsContext);


  const handleSubmit = (e) => {
    e.preventDefault();
    saveLocalStorage();
  };
  

  return (
    <>
      <h1>Manage Settings</h1>
      <form onSubmit={handleSubmit} >
        <label>
          <span>Show Completed?</span>
          <input type="checkbox" name="showCompleted" checked={showCompleted} onChange={(e) => setShowCompleted(e.target.checked)} />
        </label>
        <label>
          <span>Items per page</span>
          <input type="number" name="pageItems" value={pageItems} onChange={(e) => setPageItems(e.target.value)} />
        </label>
        <label>
          <span>Sort by</span>
          <input type="text" name="sort" value={sort} onChange={(e) => setSort(e.target.value)} />
        </label>
        <label>
          <button type="submit">Submit</button>
        </label>
      </form>
    </>
  )

}

export default Settings;
