
export const fetchBeers = async () => {
    try {
        const response = await fetch("https://api.punkapi.com/v2/beers?abv_lt=8")
        if(!response.ok) throw new Error('network error')

        return await response.json()
    } catch (error) {
        console.log(error);
        throw error
    }
}