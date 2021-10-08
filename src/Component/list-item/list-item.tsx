import { useEffect, useState } from "react";
import { IListItem } from "./list-item.interface";

function ListItem(props: any) {
  const [listItem, setListItem] = useState<IListItem>();
  const [isStatusDDOpen, toggleStatusDD] = useState<boolean>(false);

  useEffect(() => {
    setListItem(props.data.item);
  }, [props]);
  return (
    <div className="column is-4">
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-96x96">
                <img
                  className="circled"
                  src="https://avatars.dicebear.com/api/initials/john%20doe.svg"
                  alt="Image"
                />
              </figure>
            </div>
            <div
              onClick={() => toggleStatusDD(!isStatusDDOpen)}
              className="media-content"
            >
              <span className="title is-4 no-padding">{listItem?.text}</span>

              <div className="is-4">
                <div
                  className={`dropdown ${!isStatusDDOpen ? "" : "is-active"}`}
                >
                  <div className="dropdown-trigger">
                    <button
                      className="button"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu3"
                    >
                      <span>
                        {
                          listItem?.states?.find(
                            (s) => s.id === listItem.selectedState
                          )?.value
                        }
                      </span>
                      <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </button>
                  </div>
                  <div className="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                      {listItem?.states?.map(
                        (state: { id: number; value: string }) => (
                          <a
                            key={state.id}
                            onClick={(e) => onStatusChange(e, state)}
                            href="#"
                            className="dropdown-item"
                          >
                            {state.value}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function onStatusChange(e: any, state: { id: number; value: string }) {
    e.preventDefault();
    toggleStatusDD(!isStatusDDOpen);
    setListItem({ ...listItem, selectedState: state.id } as IListItem);
    props.data.onStatusChange({
      ...listItem,
      selectedState: state.id,
    } as IListItem);
  }
}

export default ListItem;
