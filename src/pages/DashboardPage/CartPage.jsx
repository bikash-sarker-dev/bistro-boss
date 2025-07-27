import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCarts from "../../hooks/useCarts";

const CartPage = () => {
  const [cart, refetch] = useCarts();
  const axiosSecure = useAxiosSecure();
  const TotalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleCartDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then(({ data }) => {
          console.log(data);
          if (data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="flex justify-between items-center m-5">
        <h2>Total Orders: {cart.length}</h2>
        <h2>Total price: {TotalPrice}</h2>
        <Link to="/dashboard/payment">
          <button className="btn btn-primary">Pay</button>
        </Link>
      </div>
      <div className="m-5">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>price</th>
                <th> action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cart.map((food, index) => (
                <tr key={food._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={food.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{food.name}</div>
                  </td>
                  <td>{food.price}</td>
                  <th>
                    <button
                      onClick={() => handleCartDelete(food._id)}
                      className="btn btn-outline btn-xs"
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
