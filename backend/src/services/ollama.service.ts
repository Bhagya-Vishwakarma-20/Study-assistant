import 'dotenv/config'
import axios from "axios";
type ModelResponse = {
    response : string
}
const MODEL_URL = process.env.MODEL_URL 
const MODEL_NAME = process.env.MODEL_NAME
export const generateResponse = async (prompt:string):Promise<string> =>{
    if (!MODEL_URL) return "invalid url"
    const {data} = await axios.post<ModelResponse>(MODEL_URL ,{model:MODEL_NAME , stream:false , prompt});
    return data.response;
}