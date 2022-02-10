import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const EditStudent = () => {
  const alert = useAlert();
  const { register, handleSubmit, reset } = useForm();
  const [info, setInfo] = useState("");
  let [color, setColor] = useState("#ffffff");
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const { id } = useParams();
  console.log(id);
  const history = useHistory();
  useEffect(() => {
    fetch(`https://boiling-ocean-57836.herokuapp.com/api/singleData/${id}`)
      .then((res) => res.json())
      .then((result) => setData(result.existStudent));
  }, [id, isLoading]);

  //Css
  const formStyle =
    "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2";
  const inputStyle =
    "bg-white h-12 w-full px-5 pr-10 mt-5 mb-3 rounded-full text-sm border-2 border-solid border-gray-300 focus:outline-none";
  const options =
    "bg-white h-12 w-full px-5 pr-10 mt-0 rounded-full text-sm border-2 border-solid border-gray-300 focus:outline-none ";
  //Sending data to the database
  //Sending data to the database
  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    setInfo(data);
    fetch(
      `https://boiling-ocean-57836.herokuapp.com/api/student/info/update/${id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert.show(data.message);
        }
        console.log(data.success);
        setLoading(false);
        if (data.success === true) {
          reset();
          alert.show("data Updated");
          history.push("/admin/manageProducts");
        }
      });
  };
  return (
    <div className="w-full">
      <form className={formStyle} onSubmit={handleSubmit(onSubmit)}>
        <h1 className="title text-4xl text-center">
          Welcome to The Admin Panel
        </h1>
        <h3 className=" text-center px-4 my-3 text-xl">Add item</h3>

        <input
          className={inputStyle}
          placeholder="student Name"
          {...register("name", { required: true })}
          defaultValue={data.name}
        />
        <input
          className={options}
          type="number"
          placeholder="student Roll"
          {...register("roll", { required: true })}
          defaultValue={data.roll}
        />
        {/* <input
          className={inputStyle}
          placeholder="Class"
          {...register("title", { required: true })}
        /> */}
        <label style={{ marginTop: "10px" }} className="form_label">
          Select Class
        </label>
        <select
          className={inputStyle}
          name="func"
          placeholder="Class"
          style={{ marginTop: "0px" }}
          {...register("class", { required: true })}
        >
          {/* <option value=""></option> */}
          <option value="Nine">Nine </option>
          <option value="Ten">Ten </option>
          <option value="Eleven">Eleven </option>
          <option value="Twelve">Twelve </option>
          <option value="Honours">Honours</option>
          <option value="Master">Master </option>
        </select>
        {/* {errors.func && <p style={{ color: "red" }}> {errors.func.message}</p>} */}
        <label style={{ marginTop: "10px" }} className="form_label">
          Select Hall
        </label>
        <select
          className={inputStyle}
          name="func"
          placeholder="Class"
          style={{ marginTop: "0px" }}
          {...register("hall", { required: true })}
        >
          {/* <option value=""></option> */}
          <option value="Saheed Jiaur Hall">Saheed Jia Hall </option>
          <option value="Salimullah Hall">Salimullah Hall </option>
          <option value="Jagannath Hall">Jagannath Hall </option>
          <option value="Begum Rockeya Hall">Begum Rockeya Hall </option>
          <option value="Sheikh Hasina Hall">Sheikh Hasina Hall</option>
          <option value="Shurjo sen Hall">Shurjo sen Hall </option>
        </select>
        <label style={{ marginTop: "10px" }} className="form_label">
          Select Status
        </label>
        <select
          className={inputStyle}
          name="func"
          placeholder="Class"
          style={{ marginTop: "0px" }}
          {...register("status", { required: true })}
        >
          {/* <option value=""></option> */}
          <option value="Active">Active </option>
          <option value="Inactive">Inactive </option>
        </select>
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

export default EditStudent;
