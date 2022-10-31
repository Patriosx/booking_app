import axios from "axios";
import { AuthContext } from "context/AuthContext";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
const cloudname = "patrios";
const Register = () => {
  const { register, loading, error } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  const [photo, setPhoto] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUser = {};
    //upload img to cloudinary
    if (photo) {
      const data = new FormData();
      data.append("file", photo);
      data.append("upload_preset", "booking_users");
      try {
        const uploadResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
          data
        );
        const { url } = uploadResponse.data;

        newUser = {
          ...userInfo,
          img: url,
        };
        console.log("hay file", newUser);
      } catch (error) {
        console.log(error);
      }
    } else {
      newUser = userInfo;
      console.log("no hay file", newUser);
    }
    try {
      //save to DB
      await axios.post(`/auth/register`, newUser);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
  };
  const handleLoadPhoto = (e) => {
    setPhoto(e.target.files[0]);
  };
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  return (
    <div className="login">
      <div className="loginContainer">
        <h2>
          <Link to={"/login"} className={"loginLink"}>
            Inicia sesión
          </Link>{" "}
          o Regístrate
        </h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="inputContainer">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleInputChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="country">País</label>
            <input
              type="text"
              name="country"
              id="country"
              onChange={handleInputChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="city">Ciudad</label>
            <input
              type="text"
              name="city"
              id="city"
              onChange={handleInputChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="text"
              name="phone"
              id="phone"
              onChange={handleInputChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleInputChange}
            />
          </div>
          <div className="inputContainer">
            <div className="photo">
              <div className="left">
                <img
                  src={
                    photo
                      ? URL.createObjectURL(photo)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="right">
                <div className="formInput">
                  <label htmlFor="file">
                    {/* Image: <DriveFolderUploadOutlinedIcon className="icon" /> */}
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={handleLoadPhoto}
                    //   style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <button disabled={loading}>Registrarse</button>
          {error && <p>{error}</p>}
          {loading && <p>{"loading..."}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
