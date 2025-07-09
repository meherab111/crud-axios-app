import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import Form from "./Form";

const Posts = () => {
  const [data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState({})

  const getPostData = async () => {
    try {
      const response = await getPost();

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeleteBtn = async (id) => {
    try {
      const response = await deletePost(id);

      if (response.status === 200) {
        const updatedNewData = data.filter((currElem) => {
          return currElem.id !== id;
        });

        setData(updatedNewData);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateBtn = (currElem) => {
    setUpdatedData(currElem)
  }

  return (
    <section className={"container mx-auto px-5 py-9"}>
      <Form data={data} setData={setData} updatedData={updatedData} setUpdatedData={setUpdatedData} />
      <ul className={"grid grid-cols-3 gap-10"}>
        {data.map((currElem, index) => {
          const { id, body, title } = currElem;

          return (
            <li
              key={id}
              className={
                "flex flex-col gap-3 border border-light-beige rounded-lg px-4 py-4 shadow-xl/20"
              }
            >
              <p className={"text-lg text-light-beige capitalize"}>{index+1}.</p>
              <p className={"text-md text-light-beige capitalize"}>
                Title: {title}
              </p>
              <p className={"text-md text-light-beige capitalize"}>
                News: {body}
              </p>
              <div className={"space-x-4 text-end"}>
                <button
                  className={
                    "border border-light-beige rounded-lg px-3 py-2 text-black bg-green-500 cursor-pointer hover:bg-green-400"
                  }
                  onClick={() => handleUpdateBtn(currElem)}
                >
                  Edit
                </button>
                <button
                  className={
                    "border border-light-beige rounded-lg px-3 py-2 text-black bg-red-500 cursor-pointer hover:bg-red-400"
                  }
                  onClick={() => handleDeleteBtn(id)}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Posts;
