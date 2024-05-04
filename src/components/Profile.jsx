import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const { name, email, profile_photo, cover_photo } = user;

  //animation
  const constrain = 150; //dividing by this constraint will control the speed of motion of cover photo
  let mouseOverContainer = document.getElementById("root");
  const coverPhotoRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState("");

  mouseOverContainer.onmousemove = (e) => {
    if (!coverPhotoRef.current) return;

    const box = coverPhotoRef.current.getBoundingClientRect(); //cover photo container position on the page with it's width and height
    const calcX = -(e.clientY - box.y - box.height / 2) / constrain;
    const calcY = (e.clientX - box.x - box.width / 2) / constrain;

    const newTransformStyle = `perspective(100px) rotateX(${calcX}deg) rotateY(${calcY}deg)`;
    setTransformStyle(newTransformStyle);
  };

  return (
    <div className="max-w-screen-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden ">
      <div className="flex  min-h-dvh">
        <div className="w-1/2 relative p-6  my-[auto]">
          <div className="absolute top-0 left-0">
            <img
              className=" w-24 rounded-full ring-4 ring-white"
              src={profile_photo}
              alt="Profile"
            />
          </div>
          <div className="mt-24">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
        <div className="w-1/2 my-[auto]">
          <div
            id="cover-photo"
            ref={coverPhotoRef}
            className="relative h-[50dvh]"
          >
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={cover_photo}
              alt="Cover"
              style={{ transform: transformStyle }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
