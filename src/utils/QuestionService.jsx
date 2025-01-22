import axios from "axios";

export const api=axios.create({
    baseURL:'http://localhost:8081/question'
})
export const getAllQuestions=async()=>{
try{
const response=await api.get("/questions");
console.log(response.data);
return response.data;
}
catch(error){
console.error(error);
}
}
export const getQuestionById=async(id)=>{
    try{
 const response=await api.get(`/questions/${id}`);
 return response.data;
    }
    catch(error){
        console.error(error);
    }
}
export const getCategories=async()=>{
    try{
    const response=await api.get("/categories");
    console.log(response.data);
    return response.data;
    }
    catch(error){
    console.error(error);
    }
}
export const addQuestion=async(question)=>{
    try{
        const response=await api.post("/questions/add",question);
        alert("Question added successfully");
        return response.data;
    }
    catch(error){
        alert("Error");
        console.error(error);
    }
}
export const updateQuestion=async(id,question)=>{
    try{
        const response=await api.put(`/questions/update/${id}`,question);
        return response.data;
    }
    catch(error){
        console.error(error);
    }
}
export const deleteQuestion=async(id)=>{
    try{
        const response=await api.delete(`/questions/delete/${id}`);
        return response.data;
    }
    catch(error){
        console.error(error);
    }
}