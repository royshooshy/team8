import { useEffect, useState } from "react";
import ListItem from "../list-item/list-item";
import { IListItem } from "../list-item/list-item.interface";

function List(props: any) {
  const handleChange = (data: IListItem) => {
    console.log(data);
  };

  const [listItems, setListItems] = useState<IListItem[]>([]);

  useEffect(() => {
    setListItems(props.items);
  }, [props]);
  return (
    <div>
      {listItems.map((item: IListItem) => (
        <ListItem
          data={{ item: { ...item }, onStatusChange: handleChange }}
        ></ListItem>
      ))}
    </div>
  );
}

export default List;
