import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCarts from "../../hooks/useCarts";

const OrderCard = ({ item }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [, refetch] = useCarts();
  const axiosSecure = useAxiosSecure();
  const { name, image, price, recipe, _id } = item;

  const handleAddToCard = (food) => {
    if (user && user?.email) {
      console.log(food, user.email);
      const cartItem = {
        menuId: _id,
        email: user?.email,
        name,
        image,
        price,
      };

      axiosSecure.post("/carts", cartItem).then(({ data }) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Successfully",
            icon: "success",
            draggable: true,
          });

          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "Your are logged In",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="card bg-base-100 shadow-xl relative">
      <figure className="">
        <img src={image} alt="Shoes" className="" />
      </figure>
      <p className="bg-slate-600 absolute top-0 right-0 p-1 text w-14 text-xl font-semibold text-white ">
        ${price}
      </p>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          <button
            onClick={() => handleAddToCard(item)}
            className="btn btn-primary"
          >
            Add Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
