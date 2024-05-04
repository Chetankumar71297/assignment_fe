import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../utils/validation.js";
import AuthInput from "./AuthInput";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate } from "react-router-dom";
import { changeStatus, registerUser } from "../../features/userSlice";
import { useState } from "react";
import Picture from "./Picture.jsx";
import axios from "axios";

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);
  const [profilePhoto, setProfilePhoto] = useState();
  const [coverPhoto, setCoverPhoto] = useState();
  const [readableProfilePhoto, setReadableProfilePhoto] = useState();
  const [readableCoverPhoto, setReadableCoverPhoto] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  const onSubmit = async (data) => {
    console.log("hi from registerform.js");
    let res;
    dispatch(changeStatus("loading"));
    if (profilePhoto && coverPhoto) {
      //upload picture to cloudinary and then register the user
      const profilePhotoUrl = await uploadImageOnCloudinary(profilePhoto);
      const coverPhotoUrl = await uploadImageOnCloudinary(coverPhoto);
      res = await dispatch(
        registerUser({
          ...data,
          profile_photo: profilePhotoUrl,
          cover_photo: coverPhotoUrl,
        })
      );
    } else if (profilePhoto) {
      //upload picture to cloudinary and then register the user
      const profilePhotoUrl = await uploadImageOnCloudinary(profilePhoto);
      res = await dispatch(
        registerUser({
          ...data,
          profile_photo: profilePhotoUrl,
          cover_photo: "",
        })
      );
    } else if (coverPhoto) {
      //upload picture to cloudinary and then register the user
      const coverPhotoUrl = await uploadImageOnCloudinary(coverPhoto);
      res = await dispatch(
        registerUser({ ...data, profile_photo: "", cover_photo: coverPhotoUrl })
      );
    } else {
      res = await dispatch(
        registerUser({ ...data, profile_photo: "", cover_photo: "" })
      );
    }
    if (res?.payload?.user) navigate("/");
  };

  const uploadImageOnCloudinary = async (picture) => {
    let formData = new FormData();
    formData.append("upload_preset", cloud_secret);
    formData.append("file", picture);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    return data.secure_url;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/*container*/}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/*heading*/}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-2 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
          {/*Form*/}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <AuthInput
              name="name"
              type="text"
              placeholder="Full name"
              register={register}
              error={errors?.name?.message}
            />
            <AuthInput
              name="email"
              type="text"
              placeholder="Email address"
              register={register}
              error={errors?.email?.message}
            />
            <AuthInput
              name="password"
              type="password"
              placeholder="Password"
              register={register}
              error={errors?.password?.message}
            />
            {/*picture*/}
            <Picture
              type="Profile photo"
              readableProfilePhoto={readableProfilePhoto}
              setReadableProfilePhoto={setReadableProfilePhoto}
              setProfilePhoto={setProfilePhoto}
              readableCoverPhoto=""
              setReadableCoverPhoto=""
              setCoverPhoto=""
            />
            <Picture
              type="Cover photo"
              readableProfilePhoto=""
              setReadableProfilePhoto=""
              setProfilePhoto=""
              readableCoverPhoto={readableCoverPhoto}
              setReadableCoverPhoto={setReadableCoverPhoto}
              setCoverPhoto={setCoverPhoto}
            />
            {/*if we have an error*/}
            {error ? (
              <div>
                <p className="text-red-400">{error}</p>
              </div>
            ) : null}
            {/*submit button*/}
            <button
              className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
              type="submit"
            >
              {status === "loading" ? <PulseLoader color="#fff" /> : "Sign up"}
            </button>
            {/*sign in link*/}
            <p className="flex flex-col items-center justify-center mt-10 text-center text-lg dark:text-dark_text_1">
              <span>Already have an account?</span>
              <Link
                to="/login"
                className="hover:underline cursor-pointer transition ease-in duration-300"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
