import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import SectionHead from "../../components/header/sectionHead/SectionHead";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { name, category, recipe, price, _id } = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    // image uploading first time
    const imageFile = { image: data.photo[0] };
    console.log(imageFile);
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(res.data);
    if (res.data.success) {
      const menuItem = {
        name: data.recipe,
        price: parseInt(data.price),
        recipe: data.recipeDetails,
        image: res.data.data.display_url,
      };

      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is update to the menu.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div>
      <SectionHead heading="UPDATE AN ITEM" subHeading="---What's update?---" />
      <div className="bg-yellow-50 m-10 p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Name *</span>
            </label>
            <input
              {...register("recipe", { required: true })}
              type="text"
              placeholder="Recipe name"
              className="input input-bordered"
              defaultValue={name}
              required
            />
          </div>
          <div className="flex gap-8">
            <div className="flex-1">
              <label className="label">
                <span className="label-text">Price *</span>
              </label>
              <select
                defaultValue={category}
                {...register("category", { required: true })}
                className="select select-bordered w-full "
              >
                <option disabled value="default">
                  Select a Category
                </option>
                <option value="salad">salad</option>
                <option value="pizza">pizza</option>
                <option value="soups">soups</option>
                <option value="desert">desert</option>
                <option value="dink">dink</option>
              </select>
            </div>

            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Price *</span>
              </label>
              <input
                {...register("price")}
                type="number"
                placeholder="price"
                className="input input-bordered"
                defaultValue={price}
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details *</span>
            </label>

            <textarea
              {...register("recipeDetails", { required: true })}
              placeholder="recipe description"
              defaultValue={recipe}
              className="textarea textarea-bordered textarea-lg w-full h-[250px]"
            ></textarea>
          </div>
          <div>
            <input
              {...register("photo", { required: true })}
              type="file"
              className="file-input w-full max-w-xs mt-5"
            />
          </div>

          <input
            className="btn btn-success mt-5 px-10"
            type="submit"
            value="Update menu item"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
