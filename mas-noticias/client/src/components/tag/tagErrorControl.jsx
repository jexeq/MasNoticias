import axios from "axios";


export default async function tagErrorControl(tagName, sectionId) {

    const res = await axios.get("/tag/" + sectionId)
    console.log("tagErrorControl - res.data: " , res.data)
    var previuosTag = res.data?.tags?.find( t => t.name === tagName)
    console.log("tagErrorControl - res.previousTag: " , previuosTag)

    if(previuosTag !== undefined) {
        return true
    }else {
        return false
    }
}