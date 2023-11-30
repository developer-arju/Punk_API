import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchBeers } from '../utils/BeerService';
import { useStore } from '../Store';
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { GridLoader } from "react-spinners"



function GridScreen(){
    const { bears, setBears } =useStore()
    const { data, isLoading } = useQuery("fetch-beer",fetchBeers)

    useEffect(() => {
        return () => {
            setBears([])
        }
    }, [])

    useEffect(() => {
        if(data){
            setBears(data)
        }

    }, [data, setBears])

    if(isLoading) {
      return <GridLoader color='yellow' />
    }

   return <div>
        <Grid style={{ height: "400px" }} data={bears}>
            <Column field="id" title="Id" width="50px" />
            <Column field="name" title="Name" width="350px" />
            <Column field="abv" title="ABV" width="60px" />
            <Column cell={ImageCell} width="60px" className='image' title='Image'  />
        </Grid>
    </div>
   }

   function ImageCell(props: any) {
    return <td><img src={props.dataItem.image_url} className='logo' /></td>
   }
 
   export default GridScreen