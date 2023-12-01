import { ROOT_ENDPOINT, BEER_ENDPOINT, PER_PAGE } from "./Constants"


export const fetchBeers = async (filter: boolean): Promise<[] | any> => {
    try {
        const query: string = `${filter ? "abv_gt=8" : "abv_lt=8"}`
        const response = await fetch(`${ROOT_ENDPOINT}${BEER_ENDPOINT}?${query}`)
        if(!response.ok) throw new Error('network error')

        return await response.json()
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const fetchCurrPageBeers = async (page: number, filter: boolean): Promise<[] | any> => {
    try {
        const query: string = `page=${page}&per_page=${PER_PAGE}&${filter ? "abv_gt=8" : "abv_lt=8"}`
        const response = await fetch(`${ROOT_ENDPOINT}${BEER_ENDPOINT}?${query}`)
        if(!response.ok) throw new Error('network error')

        return await response.json()
    } catch (error) {
        console.log(error);
        throw error
    }
}