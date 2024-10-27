import { privateApi } from "../api/api"
import {useInfiniteQuery} from "@tanstack/react-query";

const axiosWishs = async(page) => {
    try {
        const response = await privateApi.get(`/mypageCartList?page=${page}`); // API 요청
        return response.data;
    } catch (error) {
        throw error;
    }
}

const useGetWishs = () =>{
    return useInfiniteQuery({
        queryKey:['reviews'],
        queryFn:({pageParam})=>{
            return axiosWishs(pageParam)
        },
        getNextPageParam:(last)=>{
            if(last.page < last.totalPage){
                return last.page + 1
            }
            return undefined;
        },
        initialPageParam:0,
    })
}

export default useGetWishs;