import axios from "axios";

export const getHomePlanet = async(planet:string)=>{
    try{
        const resp = await axios.get(planet);
        return resp.data.name
    }catch(err){
        console.error(err);
        return "An error occocured while fetching home Planets"
    }
}
export const getDetailsFromParallelAPICalls = async(subjects:string[],propertyName:string)=>{
    try{
        const promises = subjects.map(async (subject:string)=>{
            const subjectDetails = await axios.get(subject);
            return subjectDetails.data[propertyName]
        })
        const updatedSubjects = await Promise.all(promises)
        return updatedSubjects.join(",")
    }catch(err){
        console.error(err);
        return  `An error occocured while fetching ${subjects}`
    }
}