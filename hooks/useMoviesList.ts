import fetcher from "@/libs/fetcher"
import useSWR from "swr"

const useMoviesList = ()=>{
    const {data,mutate,isLoading,error} = useSWR('/api/movies',fetcher,{
        revalidateIfStale:false,
        revalidateOnFocus:false,
        revalidateOnReconnect:false
    })

    return {
        data,
        error,
        isLoading,
        mutate
    }

}

export default useMoviesList;