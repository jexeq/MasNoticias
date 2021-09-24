import axios from "axios";



export default async function TagErrorControl(tagName, sectionId) {
    
    
    try {
        const res = await axios.get("/tag/" + sectionId)
        // console.log("tagErrorControl - res.data: " , res.data)
        var previuosTag = res.data?.tags?.find( t => t.name === tagName)
        
        // console.log("tagErrorControl - res.previousTag: " , previuosTag)
    
        if(previuosTag !== undefined) {
            return true
        }else {
            return false
        }

    }catch (err) {
        alert(err)
    }
}