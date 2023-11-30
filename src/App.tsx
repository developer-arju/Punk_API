
import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'
import '@progress/kendo-theme-default/dist/all.css';
import "./App.css"

import GridScreen from './components/GridScreen';
import { Button } from "@progress/kendo-react-buttons";

const queryClient = new QueryClient()


  
  function App() {
    const [showGrid, setShowGrid] = useState(false)

    const handleGridView = () => {
      setShowGrid((prev: boolean) => !prev)
    }


    return (
      <QueryClientProvider client={queryClient} >
        <div className='app'>
            <Button onClick={handleGridView}>
                {showGrid ? "Close Grid" : "Show Grid"}
            </Button>
            {showGrid &&  <GridScreen  />}
        </div>
      </QueryClientProvider>
    )
  }
  
  export default App
  
  
