import { useEffect, useState } from "react";
import ListItem from "../list-item/list-item";
import { IListItem } from "../list-item/list-item.interface";
import configData from "../../config.json";
import axios from "axios";

function List(props: any) {
  const [listItems, setListItems] = useState<IListItem[]>([]);
  useEffect(() => {
    setListItems(props.data.items);
  }, [props]);
  const handleStatusChange = (data: IListItem) => {
    props.data.onStatusChange(data);
  };
  return (
    <div className="container">
      <div className="section">
        <div className="columns">
          <div className="column has-text-centered">
            <h1 className="title">Bulma Card Layout Template</h1>
          </div>
        </div>
        <div className="column has-text-centered">
          <h1 className="title">Bulma Card Layout Template</h1>
        </div>
        <div className="row columns is-multiline">
          {listItems.map((item: IListItem) => (
            <ListItem
              key={item.id}
              data={{ item: { ...item }, onStatusChange: handleStatusChange }}
            ></ListItem>
          ))}
        </div>
      </div>
    </div>
  );
}

export default List;
