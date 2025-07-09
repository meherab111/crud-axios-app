import { useEffect, useState } from "react";
import { postData, putData } from "../api/PostApi";

const Form = ({ data, setData, updatedData, setUpdatedData }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (updatedData) {
      setAddData({
        title: updatedData.title || "",
        body: updatedData.body || "",
      });
    }
  }, [updatedData]);

  let changingBtn = Object.keys(updatedData).length === 0;

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    try {
      const response = await postData(addData);

      if (response.status === 201) {
        setData([...data, response.data]);
      }

      setAddData({
        title: "",
        body: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updatePostData = async () => {
    try {
      const response = await putData(updatedData.id, addData);

      if (response.status === 200) {
        setData((prev) => {
          return prev.map((currElem) => {
            return currElem.id === response.data.id ? response.data : currElem;
          });
        });

        setAddData({
          title: "",
          body: "",
        });

        setUpdatedData({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const action = event.nativeEvent.submitter.value;

    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  return (
    <section>
      <form
        className={"flex justify-center py-10 gap-5"}
        onSubmit={handleFormSubmit}
      >
        <div>
          <label htmlFor="title"></label>
          <input
            type="text"
            autoComplete="off"
            id="title"
            name="title"
            placeholder="Add Title ..."
            className={
              "border border-light-beige rounded-lg px-2 py-2 placeholder:text-gray-400 text-white"
            }
            value={addData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="body"></label>
          <input
            type="text"
            autoComplete="off"
            id="body"
            name="body"
            placeholder="Add Post ..."
            className={
              "border border-light-beige rounded-lg px-2 py-2 placeholder:text-gray-400 text-white"
            }
            value={addData.body}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className={
            "border border-light-beige rounded-lg px-3 py-2 text-black bg-green-500 cursor-pointer hover:bg-green-400"
          }
          value={changingBtn ? "Add" : "Edit"}
        >
          {changingBtn ? "Add" : "Edit"}
        </button>
      </form>
    </section>
  );
};

export default Form;
