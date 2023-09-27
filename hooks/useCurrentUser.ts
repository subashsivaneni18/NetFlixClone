import fetcher from '@/libs/fetcher'
import useSwr from 'swr'
const useCurrentUser =()=>{
    const {data,isLoading,mutate,error} = useSwr('/api/current',fetcher)

    return{
        data,
        isLoading,
        mutate,
        error
    }
}

export default useCurrentUser