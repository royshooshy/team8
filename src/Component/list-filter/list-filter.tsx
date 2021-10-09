import { useEffect, useRef, useState } from "react";
import { debounce, debounceTime, Subject } from "rxjs";

const ListFilter = (props: any) => {
  const filterChange$ = new Subject<any>();
  const [filterSelection, setFilterSelection] = useState<{
    str: string;
    status: { id: number; value: string };
  }>({ str: "", status: { id: -1, value: "Select Status" } });
  const [statuses, setStatuses] = useState<{ id: number; value: string }[]>([]);
  const [isModalOpen, toggleModal] = useState<boolean>(false);
  const createItemInput = useRef<any>(null);
  const createItemSelection = useRef<any>(null);

  useEffect(() => {
    setStatuses([{ id: -1, value: "Select Status" }, ...props.data.statuses]);
    // setStatuses(props.data.statuses);
  }, [props]);

  const onStatusSelectClick = (e: any) => {
    const selectedStatus = statuses.find(
      (s) => s.id === +e.target.selectedOptions[0].value
    );
    filterChange$.next({
      ...(filterSelection as {
        str: string;
        status: { id: number; value: string };
      }),
      status: selectedStatus as { id: number; value: string },
    });
    setFilterSelection({
      ...(filterSelection as {
        str: string;
        status: { id: number; value: string };
      }),
      status: selectedStatus as { id: number; value: string },
    });
  };
  const onInputChange = (e: any) => {
    filterChange$.next({
      ...(filterSelection as {
        str: string;
        status: { id: number; value: string };
      }),
      str: e.target.value,
    });
    setFilterSelection({
      ...(filterSelection as {
        str: string;
        status: { id: number; value: string };
      }),
      str: e.target.value,
    });
    //props.data.onFilterChange({ selectedStatus });
  };

  const onCreateUser = (e: any) => {
    props.data.onCreateUser({
      selectedState: createItemSelection?.current?.selectedOptions[0].value,
      text: createItemInput?.current?.value,
    });
  };

  const clearModal = () => {
    // TODO: replace with a hook
    (document?.querySelector("[data-id='createItemInput']") as any).value = "";

    (
      document?.querySelector("[data-id='createItemSelection']") as any
    ).selectedIndex = undefined;
  };
  filterChange$
    .pipe(debounceTime(300))
    .subscribe((data) => props.data.onFilterChange(data));

  return (
    <>
      <div className="row columns is-centered is-gapless">
        <div className="column">
          <div className="buttons is-right">
            <button
              onClick={() => {
                clearModal();
                toggleModal(!isModalOpen);
              }}
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
                <p className="modal-card-title">Create New</p>
              </header>
              <section className="modal-card-body">
                <input
                  data-id="createItemInput"
                  ref={createItemInput}
                  className="input"
                  type="text"
                  placeholder="Type User Name"
                />
                <div className="column">
                  <div className="select">
                    <select
                      data-id="createItemSelection"
                      ref={createItemSelection}
                      onChange={(e) => onStatusSelectClick(e)}
                    >
                      {statuses
                        .filter((s) => s.id !== -1)
                        .map((status: { id: number; value: string }) => (
                          <option value={status.id}>{status.value}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot">
                <button
                  onClick={(e) => {
                    toggleModal(!isModalOpen);
                    onCreateUser(e);
                  }}
                  className="button is-info"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    clearModal();
                    toggleModal(!isModalOpen);
                  }}
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
