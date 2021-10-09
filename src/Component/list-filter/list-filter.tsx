function ListFilter(props: any) {
  // const [listItem, setListItem] = useState<IListItem>();
  // const [isStatusDDOpen, toggleStatusDD] = useState<boolean>(false);

  // useEffect(() => {
  //   setListItem(props.data.item);
  // }, [props]);
  return (
    <>
      
          <div className="row columns is-centered is-gapless">
            <div className="column">
              <div className="buttons is-right">
                <button className="button is-info">Create</button>
              </div>
            </div>
            <div className="column ">
              <input
                className="input is-normal"
                type="text"
                placeholder="Type to search"
              ></input>
            </div>
            <div className="column">
              <div className="select">
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
            </div>
          </div>
       

    
    </>
  );
}

export default ListFilter;
