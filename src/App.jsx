import { useEffect } from "react";
import { getPost } from "./api/PostApi";

const App = () => {
  
  const getPostData = async () => {
    
    const response = await getPost()

    console.log(response.data);
  }
  
  useEffect(() => {

    getPostData()

  },[])

  return <h1 className={"text-4xl text-center capitalize"}>react crud op</h1>;
};

export default App;
