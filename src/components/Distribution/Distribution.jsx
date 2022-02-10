import React, { useEffect, useState } from "react";

const Distribution = () => {
  const [data, setData] = useState([]);
  const [food, setFood] = useState([]);
  const [searchTerm, setSearchTerm] = useState(" ");
  const [status, setStatus] = useState("");
  const [item, setItem] = useState("");
  const [shift, setShift] = useState("");
  const [id, setId] = useState("");
  const [store, setStore] = useState([]);
  useEffect(() => {
    fetch(`https://boiling-ocean-57836.herokuapp.com/api/getAllData`)
      .then((res) => res.json())
      .then((result) => setData(result.allStudent));
  }, []);

  // Post item kaksldals

  const disData = {
    studentId: id,
    shift: shift,
    foodItem: item,
    status: status,
  };

  console.log(disData);

  useEffect(() => {
    fetch("https://boiling-ocean-57836.herokuapp.com/api/distribute", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(disData),
    })
      .then((res) => res.json())
      .then((data) => {
        // if (data.message) {
        //   alert(data.message);
        // }

        console.log(data);
        if (data.success === true) {
          alert("Data added");
        }
      });
  }, [status]);

  // Get Stored data

  useEffect(() => {
    fetch(`https://boiling-ocean-57836.herokuapp.com/api/getServe/data`)
      .then((res) => res.json())
      .then((result) => setStore(result.serveData));
  }, []);

  // FoodItem
  useEffect(() => {
    fetch(`https://boiling-ocean-57836.herokuapp.com/api/getAllFood/item`)
      .then((res) => res.json())
      .then((result) => setFood(result.allFoodItem));
  }, []);

  //   let item =
  //   console.log(item);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  return (
    <div>
      <div className=" ">
        <div className="mx-auto w-full">
          <div class="pt-2 relative mx-auto w-96 text-gray-600">
            <input
              className="border-2 my-10 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
              onChange={(e) => {
                setSearchTerm(e.target.value.toString());
                console.log(e.target.value.toString());
              }}
            />
          </div>
        </div>
        <div className="">
          {data
            .filter((val) => {
              if (searchTerm === " ") {
                return val;
              } else if (val.roll.toString().includes(searchTerm.toString())) {
                console.log(val.roll);
                return val;
              }
            })
            .map((val, key) => (
              <div className=" block flex-col w-full mx-auto" key={key}>
                <div className="  flex justify-center">
                  <thead className="block md:table-header-group ">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                      <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-48">
                        Id
                        <p className="text-black">{key}</p>
                      </th>
                      <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-48">
                        Name
                        <p className="text-black">{val.name}</p>
                      </th>
                      <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-32">
                        StudentId
                        {/* <input
                          className="text-black"
                          onBlur={(e) => console.log(e.target.value)}
                          type="text"
                          value={val.roll}
                        /> */}
                        <p
                          onBlur={(e) => console.log(e.target.value)}
                          className="text-black"
                        >
                          {val.roll}
                        </p>
                      </th>
                      <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-48">
                        Date
                        <p className="text-black">{today}</p>
                      </th>
                      <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-48">
                        Shift
                        <p>
                          <select
                            onChange={(e) => setShift(e.target.value)}
                            className="bg-black"
                            name=""
                            id=""
                          >
                            <option disabled selected value>
                              {" "}
                              select Shift{" "}
                            </option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                          </select>
                        </p>
                      </th>
                      <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-48">
                        FoodItem
                        <p>
                          <select
                            onChange={(e) => setItem(e.target.value)}
                            onBlur={(e) => setId(val.roll)}
                            className="bg-black"
                            name=""
                            id=""
                          >
                            <option disabled selected value>
                              {" "}
                              select Food{" "}
                            </option>
                            {food.map((item, key) => (
                              <option key={key} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </p>
                      </th>
                      <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell w-48">
                        Status
                        <p>
                          <select
                            onChange={(e) => setStatus(e.target.value)}
                            className="bg-black"
                            name=""
                            id=""
                          >
                            <option disabled selected value>
                              {" "}
                              select status{" "}
                            </option>
                            <option key={key} value="served">
                              Served
                            </option>
                          </select>
                        </p>
                      </th>
                    </tr>
                  </thead>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Distribution;
