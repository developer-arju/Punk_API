import { useQuery } from "react-query"
import { fetchBeers, fetchCurrPageBeers } from "../utils/BeerService"


export const useBeerQuery = (filter: boolean) => {
   return useQuery(['total-beers', filter], ()=> fetchBeers(filter), { enabled: false})
}

export const useBearQueryWithPage = (page: number, filter: boolean) => {
    return useQuery(["beers", page, filter],() => fetchCurrPageBeers(page, filter), {enabled: false} )
}

