import axios from "axios";
import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import authReducer from "./authReducer";

const initialState = {
  //localstorage has to be String
  user: JSON.parse(localStorage.getItem("user")) || null, //if there is a user saved in localStorage
  loading: false,
  error: null,
};
const cloudname = process.env.REACT_APP_CLOUDNAME;

export const AuthContext = createContext(initialState);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials) => {
    dispatch({ type: "START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "SUCCESS", payload: res.data.details });
    } catch (err) {
      dispatch({ type: "FAILURE", payload: err.response.data.message });
    }
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const register = async (userInfo) => {
    dispatch({ type: "START" });
    const { photo, ...others } = userInfo;
    let url = null;

    if (userInfo.photo) {
      url = await uploadAvatar(userInfo.photo);
    }
    const newUser = { ...others, img: url };
    try {
      //Save to DDBB
      await axios.post(`/auth/register`, newUser);
      dispatch({
        type: "SUCCESS",
        payload: null,
      });
    } catch (error) {
      console.log("error register", error);
      dispatch({ type: "FAILURE", payload: error.response.data.message });
    }
  };
  const uploadAvatar = async (photo) => {
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "booking_users");
    try {
      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
        data
      );
      const { url } = uploadResponse.data;

      return url;
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    //when user changes we save in localstorage
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
        login,
        logout,
        register,
        uploadAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
