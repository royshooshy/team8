import { IListItem } from "./list-item.interface";

function ListItem(props: any) {
  return (
    <div>
      {props.data.item.text}
      <button onClick={onStatusChange}>Change Profile</button>
    </div>
  );

  function onStatusChange() {
    props.data.onStatusChange("XXXXXXXXXXXXXXXX");
  }
}

export default ListItem;
