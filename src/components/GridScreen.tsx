import {
  Grid,
  GridColumn as Column,
  GridCellProps,
} from "@progress/kendo-react-grid";

function GridScreen({ data }: any) {
  return (
    <div>
      <Grid style={{ height: "266px" }} data={data}>
        <Column field="id" title="Id" width="50px" />
        <Column field="name" title="Name" />
        <Column field="abv" title="ABV" width="60px" />
        <Column cell={ImageCell} width="60px" className="image" title="Image" />
      </Grid>
    </div>
  );
}

function ImageCell(props: GridCellProps) {
  return (
    <td>
      <img src={props.dataItem.image_url} className="logo" />
    </td>
  );
}

export default GridScreen;
