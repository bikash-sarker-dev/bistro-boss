import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TopTitle from "../components/TapTitle/TopTitle";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SignUpPage = () => {
  const axiosPublic = useAxiosPublic();
  const { createAccount, profileUpdate, googleLogin } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createAccount(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        profileUpdate(data.name, data.photo).then(() => {
          console.log("update");
          let userInfo = {
            name: data.name,
            email: data.email,
          };
          console.log(userInfo);
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "successfully",
                icon: "success",
                draggable: true,
              });
            }
          });

          reset();
          navigate("/");
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  console.log(watch("example"));

  const handleGoogle = () => {
    googleLogin()
      .then((result) => {
        console.log(result);
        let userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };

        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate("/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <TopTitle title="Bistro Boss | Login" />
      <section>
        <div className="container">
          <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Sign Up now!</h1>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
              </div>
              <div className="card bg-base-100 w-1/2 shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">User Name</span>
                    </label>
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      name="name"
                      placeholder="user name"
                      className="input input-bordered"
                    />
                    {errors.name && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Photo Url</span>
                    </label>
                    <input
                      {...register("photo", { required: true })}
                      type="url"
                      placeholder="Photo Url"
                      className="input input-bordered"
                    />
                    {errors.photo && (
                      <span className="text-red-600">
                        This photo url required
                      </span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="email"
                      name="email"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                      })}
                      type="password"
                      placeholder="password"
                      name="password"
                      className="input input-bordered"
                      required
                    />
                    {errors.password && (
                      <span className="text-red-600">
                        This minim 6 characters password
                      </span>
                    )}
                  </div>
                  <div className="form-control mt-6">
                    <input
                      className="btn btn-primary"
                      type="submit"
                      value="Sign UP"
                    />
                  </div>
                </form>
                <p>
                  <button
                    onClick={handleGoogle}
                    className="btn btn-secondary px-10 mx-10"
                  >
                    Google login
                  </button>
                </p>
                <div className="text-center my-5">
                  <p>
                    Already sign Up?
                    <Link className="font-bold underline" to="/login">
                      go to log in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
