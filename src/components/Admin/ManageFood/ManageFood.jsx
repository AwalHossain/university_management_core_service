import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useHistory } from "react-router-dom";
import "./ManageFood.css";
const ManageFood = () => {
  const [orders, setOrders] = useState([]);
  const [control, setControl] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  useEffect(() => {
    fetch(
      `https://boiling-ocean-57836.herokuapp.com/api/getAllItem?page=${currentPage}`
    )
      .then((res) => res.json())
      .then((result) => setOrders(result));
  }, [control, currentPage]);

  const { resultPerPage, products, productsCount } = orders;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  //Delete Order
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure want to delete?");
    if (confirm) {
      fetch(
        `https://boiling-ocean-57836.herokuapp.com/api/foodItem/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          alert("Order deleted");
          setControl(!control);
        });
    }
  };

  //Approved Order
  const handleUpdate = (id) => {
    history.push(`/admin/single/${id}`);
  };

  return (
    <div className="w-full">
      <h3>Hello from mange order</h3>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Title
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Name
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Price
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        {products?.map((pd, index) => (
          <tbody className="block md:table-row-group">
            <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  title
                </span>
                {index}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Name
                </span>
                {pd.name}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Price
                </span>
                {pd.price}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Actions
                </span>
                <div>
                  <button
                    onClick={() => handleUpdate(pd._id)}
                    className="bg-yellow-400 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                  >
                    Edit
                  </button>
                </div>
                <button
                  onClick={() => handleDelete(pd._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <div className="paginationBox">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="1st"
          lastPageText="Last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
      </div>
    </div>
  );
};

export default ManageFood;
