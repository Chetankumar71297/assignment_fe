import { useRef, useState } from "react";

export default function Picture({
  type,
  readableProfilePhoto,
  setReadableProfilePhoto,
  setProfilePhoto,
  readableCoverPhoto,
  setReadableCoverPhoto,
  setCoverPhoto,
}) {
  const inputRef = useRef();
  const [error, setError] = useState("");
  const handlePicture = (e) => {
    console.log("hi from Picture.js");
    setError("");
    let pic = e.target.files[0];
    if (!pic) {
      return;
    }
    if (
      pic?.type !== "image/jpeg" &&
      pic?.type !== "image/png" &&
      pic?.type !== "image/webp"
    ) {
      setError("Images of jpeg, png and webp format is allowed");
      return;
    } else if (pic?.size > 1024 * 1024 * 5) {
      setError("Size of image should be less than 5Mb");
      return;
    } else {
      type === "Profile photo" ? setProfilePhoto(pic) : setCoverPhoto(pic);
      //reading the picture
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        type === "Profile photo"
          ? setReadableProfilePhoto(e.target.result)
          : setReadableCoverPhoto(e.target.result);
      };
    }
  };
  const handleChangePic = () => {
    type === "Profile photo" ? setProfilePhoto("") : setCoverPhoto("");
    type === "Profile photo"
      ? setReadableProfilePhoto("")
      : setReadableCoverPhoto("");
  };
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        {type} (Optional)
      </label>
      {(
        type === "Profile photo" ? readableProfilePhoto : readableCoverPhoto
      ) ? (
        <div>
          <img
            src={
              type === "Profile photo"
                ? readableProfilePhoto
                : readableCoverPhoto
            }
            alt=""
            className="w-20 h-20 object-cover rounded-full"
          />
          {/*change picture*/}
          <div
            className="mt-2 w-20 py-1 dark:bg-dark_bg_3 rounded-md text-xs font-bold flex items-center justify-center cursor-pointer"
            onClick={() => handleChangePic()}
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
          onClick={() => inputRef.current.click()}
        >
          Upload photo
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/png,image/jpeg,image/webp"
        onChange={handlePicture}
      />
      {/*error*/}
      <div className="mt-2">
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  );
}
