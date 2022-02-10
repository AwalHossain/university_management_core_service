import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useAlert } from "react-alert";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const AddFood = () => {
  const alert = useAlert();
  const { register, handleSubmit, reset } = useForm();
  let [color, setColor] = useState("#ffffff");
  const [info, setInfo] = useState("");
  const [isLoading, setLoading] = useState(false);
  //Css
  const formStyle =
    "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2";
  const inputStyle =
    "bg-white h-12 w-full px-5 pr-10 mt-5 rounded-full text-sm border-2 border-solid border-gray-300 focus:outline-none";

  //Sending data to the database
  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    setInfo(data);
    fetch("https://boiling-ocean-57836.herokuapp.com/api/uploadFoodItems", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert.show(data.message);
        }
        console.log(data.success);
        setLoading(false);
        if (data.success === true) {
          reset();
          alert.show("data added");
        }
      });
  };

  return (
    <div className="w-full">
      <form className={formStyle} onSubmit={handleSubmit(onSubmit)}>
        <h1 className=" text-4xl text-center">Welcome to The Admin Panel</h1>
        <h3 className=" text-center px-4 my-3 text-xl">Add item</h3>

        <input
          className={inputStyle}
          placeholder="Enter Food Name"
          {...register("name", { required: true })}
        />

        <input
          className={inputStyle}
          placeholder="Price"
          {...register("price", { required: true })}
        />
        {/* Spinner for Loading */}
        {isLoading && (
          <ClipLoader
            color={color}
            loading={isLoading}
            css={override}
            size={50}
          />
        )}
        <input
          type="submit"
          className="w-full text-md px-5 py-2 my-4 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
        />
      </form>
    </div>
  );
};

export default AddFood;
