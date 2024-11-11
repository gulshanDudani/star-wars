import axios from "axios"
import { getDetailsFromParallelAPICalls, getHomePlanet } from "../../Services/helper";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../Utils/constants";
import { Character } from "../../Types";

export const useGetCharacterDetails = (id="1")=>{
    const fetchData = async()=>{
        const {data} = await axios.get<Character>(`${BASE_URL}/people/${id}`);
        data.id = data.url.split("/").at(-2);
        const [homePlanet, filmTitle, updatedStarships] = await Promise.all([
            getHomePlanet(data.homeworld),
            getDetailsFromParallelAPICalls(data.films, "title"),
            getDetailsFromParallelAPICalls(data.starships, "name"),
          ]);
    
          return {
            ...data,
            homePlanet,
            filmTitle,
            updatedStarships,
          };
    }
        const {data, isLoading, isError}= useQuery({
        queryKey: ["CharacterDetails",id],
        queryFn: ()=>fetchData(),
        })
        return {data,isLoading, isError}
    
}