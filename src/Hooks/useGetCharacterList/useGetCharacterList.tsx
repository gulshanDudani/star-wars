import axios from "axios"
import { getHomePlanet } from "../../Services/helper";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { BASE_URL } from "../../Utils/constants";
import { Character, CharacterListResponse } from "../../Types";

const fetchData = async (pagination: PaginationState, searchText: string) => {
    let url = `${BASE_URL}/people?page=${pagination.pageIndex + 1}`;
    if (searchText) {
        url = `${url}&search=${searchText}`
    }
    const { data } = await axios.get<CharacterListResponse>(url);
    const { results, count } = data;
    const promises = results.map(async (result:Character) => {
        result.homePlanet = await getHomePlanet(result.homeworld);
        result.id = result.url.split("/").at(-2);
        return result
    });
    const updatedResults = await Promise.all(promises);
    return {
        rows: updatedResults,
        pageCount: Math.ceil(count / pagination.pageSize),
        rowCount: count
    }
}
export const useGetCharacterList = (pagination = { pageIndex: 0, pageSize: 10 }, searchText = "") => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["CharacterList", pagination, searchText],
        queryFn: () => fetchData(pagination, searchText),
        placeholderData: keepPreviousData
    })
    return { data, isLoading, isError }

}