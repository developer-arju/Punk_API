import { ReactElement } from "react";
import {
  Grid,
  GridColumn as Column,
  GridCellProps,
} from "@progress/kendo-react-grid";
import { motion, Variants } from "framer-motion";

const gridVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      delay: 0.3,
      duration: 1,
    },
  },
};

function GridScreen({ data }: any): ReactElement {
  return (
    <motion.div
      className="grid"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
    >
      <Grid style={{ height: "266px" }} data={data}>
        <Column field="id" title="Id" width="50px" />
        <Column field="name" title="Name" />
        <Column field="abv" title="ABV" width="60px" />
        <Column cell={ImageCell} width="60px" className="image" title="Image" />
      </Grid>
    </motion.div>
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
