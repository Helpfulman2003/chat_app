import React, { useEffect, useState } from "react";
import { setImage } from "../utils/APIRoutes";
import loader from "../assets/loader.gif"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import rateLimit from "axios-rate-limit";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/userSlice";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const user = useSelector((state) => state?.user?.user)
  const dispatch = useDispatch()

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const http = rateLimit(axios.create(), {
    maxRequests: 2,
    perMilliseconds: 1000,
    maxRPS: 2,
  });

  const setProfilePicture = async () => {
    if (selected === null) {
      toast.error("Please select an avatar", toastOptions);
    }else {
      const {data} = await axios.post(`${setImage}/${user._id}`, {
        image: avatars[selected]
      }) 

      if(data.success) {
        dispatch(updateUser(data.user))
        navigate('/')
      }else {
        toast.error("Error setting avatar. Please try again", toastOptions)
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      try {
        for (let i = 0; i < 4; i++) {
          const image = await http.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvatar(data);
        setIsLoading(false);
      } catch (error) {
        console.error("An error occurred while fetching the avatars:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center flex-col gap-12 bg-[#131324] h-screen w-screen">
          <img src={loader} alt="" />
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center flex-col gap-12 bg-[#131324] h-screen w-screen">
            <div className="text-white">
              <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className="flex gap-8">
              {avatars?.map((avatar, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      selected === index
                        ? "border-[0.4rem] border-solid border-[#4e0eff]"
                        : "border-solid border-transparent border-[0.4rem]"
                    }  p-[0.4rem] rounded-[50%] flex items-center justify-self-center transition-all duration-500`}
                  >
                    <img
                      onClick={() => setSelected(index)}
                      src={`data:image/svg+xml;base64,${avatar}`}
                      className="h-24"
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
            <button
              className="bg-[#997af0] text-white px-8 py-4 font-bold cursor-pointer text-[1rem] uppercase hover:bg-[#4e0eff] transition-all duration-500 rounded-lg"
              onClick={setProfilePicture}
            >
              Set as Profile Picture
            </button>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Same as */}
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default SetAvatar;
