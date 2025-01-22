import axios from "axios";
export const api2=axios.create({
    baseURL:'http://localhost:8081/quiz'
})
export const createQuiz=async(category,num,title)=>{
    try{
        const response=await api2.get(`/create?category=${category}&num=${num}&title=${title}`);
        return response.data;
    }
    catch(error){
        console.error(error);
    }
}
export const getQuestions=async(id)=>{
    try{
        const response=await api2.get(`/get/${id}`);
        return response.data;
    }
    catch(error){
        console.error(error);
    }
}
export const getQuestionsAdmin=async(id)=>{
    try{
        const response=await api2.get(`/getadmin/${id}`);
        return response.data;
    }
    catch(error){
        console.error(error);
    }
}
export const getQuizzes=async()=>{
    try{
     const response=await api2.get("/allquiz");
     return response.data;
    }
    catch(error){
        console.error(error);
    }
}
export const getAllQuiz=async(category)=>{
    try{
        const response=await api2.get(`/getAllQuiz?category=${category}`);
        return response.data;
    }
    catch(error){
        console.error(error);
    }
}
export const calc=async(id,responses)=>{
    try{
        console.log(responses);
        const response=await api2.post(`/submit/${id}`,responses, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
    catch(error){
        console.error(error);
    }
}