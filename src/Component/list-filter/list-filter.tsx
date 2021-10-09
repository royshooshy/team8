import { useEffect, useState } from "react";

const ListFilter = (props: any) => {
  const [statuses, setStatuses] = useState<{ id: number; value: string }[]>([]);
  const [isStatusDDOpen, toggleStatusDD] = useState<boolean>(false);
  const [isModalOpen, toggleModal] = useState<boolean>(false);

  useEffect(() => {
    setStatuses([{ id: -1, value: "Select Status" }, ...props.data.statuses]);
    // setStatuses(props.data.statuses);
  }, [props]);

  const onStatusSelectClick = (e: any) => {
    const selectedStatus = statuses.find(
      (s) => s.id === +e.target.selectedOptions[0].value
    );
  };
  const onInputChange = (e: any) => {
    console.log(e.target.value);

    //props.data.onFilterChange({ selectedStatus });
  };

  return (
    <>
      <div className="row columns is-centered is-gapless">
        <div className="column">
          <div className="buttons is-right">
            <button
              onClick={() => toggleModal(!isModalOpen)}
              className="button is-info"
            >
              Create
            </button>
          </div>
        </div>
        <div className="column ">
          <input
            onKeyUp={(value) => onInputChange(value)}
            className="input is-normal"
            type="text"
            placeholder="Type to search"
          ></input>
        </div>
        <div className="column">
          <div className="select">
            <select onChange={(e) => onStatusSelectClick(e)}>
              {statuses.map((status: { id: number; value: string }) => (
                <option value={status.id}>{status.value}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className={`modal has-background-grey-lighter ${
            !isModalOpen ? "" : "is-active"
          }`}
        >
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Create New User</p>
              </header>
              <section className="modal-card-body">
                <input
                  className="input"
                  type="text"
                  placeholder="Type User Name"
                />
              </section>
              <footer className="modal-card-foot">
                <button className="button is-info">Create</button>
                <button
                  onClick={() => toggleModal(!isModalOpen)}
                  className="button"
                >
                  Cancel
                </button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListFilter;
