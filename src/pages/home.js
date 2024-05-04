import { useDispatch, useSelector } from "react-redux";
import Profile from "../components/Profile";
import QRCodeGenerator from "../components/QRCodeGenerator";
import { logoutUser } from "../features/userSlice";

function Home() {
  const { user } = useSelector((state) => state.user);
  const { _id } = user;
  const profileLink = `http://localhost:3000/user/findUser/${_id}`;
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    console.log("hi");
    e.preventDefault();
    const res = await dispatch(logoutUser());
    console.log(res);
  };

  return (
    <div>
      <div>
        <button
          className="rounded-lg bg-red-500 text-gray-700 font-bold p-2"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
      <Profile />
      <QRCodeGenerator profileLink={profileLink} />
    </div>
  );
}

export default Home;
