import {YoutubeItem,YoutubeResponse} from "../../commons/commonsData";

const API_KEY="AIzaSyBam3-MPEDQMYcUtgH0Ot9cr2gQOdodJ7A"
export const YoutubeApi = async (keyword: string):Promise<YoutubeResponse> => {
    const response = await fetch(`
           https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResult=28&q=${keyword}&type=video&key=${API_KEY}
           `
    )
    if (!response.ok) {
        throw new Error("Youtube API Error")
    }
    return await response.json()
}