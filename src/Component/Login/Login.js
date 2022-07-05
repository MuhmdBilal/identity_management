import React, { useRef, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { contractAddress, contractAbi } from "../Utils/Constants";
import web3 from "web3";
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
function Login({ account, setIsDispaly }) {

  const formSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full name is mandatory"),
    email: Yup.string()
      .required("Email is mandatory")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Enter a valid email address"
      ),
    birthday: Yup.string()
      .required("date of Bitrh is mandatory"),
    address: Yup.string()
      .required("Address is mandatory"),

    city: Yup.string()
      .required("City is mandatory")
      .matches(
        /([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/,
        "Must be Alphabet letters"
      ),
    zip: Yup.string()
      .required("Zip Code is mandatory")
      .matches(
        /[0-9]{5}/,
        "must be Number"
      ),
    gender: Yup.string()
      .required("Please fill this input"),
    religion: Yup.string()
      .required("religion is mandatory")
    // .matches(
    //     /([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/,
    //     "Must be Alphabet letters"
    // ),
  })

  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, resetField, watch, formState: { errors } } = useForm(formOptions);






  let isEmail = useRef("");
  // let {isEmail, setIsEmail}= useState("")
  const navigate = useNavigate()
  const handleSubmits = async (e) => {
    e.preventDefault();
    try {
      let email = isEmail.current.value;
      console.log("account" , account);
      console.log(email);
      const web3 = window.web3;
      let contractOf = new web3.eth.Contract(contractAbi, contractAddress);
      let UserMap = await contractOf.methods.UserMap(account).call();
      if (email == UserMap.EmailAddress) {
        // setIsDispaly(true)
        toast.success("✔️ Login successfully");
        navigate('/dashboard')
      } else {
        toast.error("❌ Please Sign Up");
        navigate('/signup')
      }
      resetField("email");
    } catch (e) {
      console.log("e", e);
    }
  };
  return (

    <div className="d-flex justify-content-center align-items-center" style={{ background: "rgb(23, 23, 24)", height: "100vh" }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Login</h2>
          </div>
        </div>
        <form className="form" onSubmit={handleSubmits}>
          <div className="row d-flex justify-content-center text-start ">
            <div className="col-md-6">
              <div class="mb-4">
                <label for="email" class="form-label form-heading lable-text">Email Id</label>
                <input  placeholder="Type your email address" 
                className="form__input form-control"
                                type="text"
                                name="email"
                                required
                                ref={isEmail}
                  // {...register("email", { required: true })}
                />
                {/* {errors.email && <> &nbsp;<span style={{ color: "red" }}>{errors.email.message}</span></>} */}
              </div>
            </div>

          </div>
          <div className="row d-flex justify-content-center text-start ">
            <div className="col-md-6">
              <div class="mb-4">
                <label for="username" class="form-label form-heading lable-text">Passwordd</label>
                <input type="text" placeholder="Type your email address" class="form-control input-color"
                  // ref={emailId}
                  value={account}
                />
                
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">
              <div className="d-grid gap-2">
                <button className="btn btn-success" size="lg" type="submit">
                  login
                </button>
              </div>
            </div>
          </div>

          <div className="form__group">
            <p className="form__text">
              Don't have an account yet? Sign up from
              <Link to="/signup">
                <a href="#" className="form__link">
                  {" "}
                  here
                </a>
              </Link>
            </p>
          </div>
        </form>

      </div>
    </div>

    // <div className="overlay">
    //   <div className="login">
    //     <div className="login__inner">
    //       <div className="login__header">
    //         <div className="login__title">
    //           <h1 className="login__heading">LogIn</h1>
    //         </div>
    //       </div>
    //       <div className="login__content">
    //         <div className="login__form">
    //           <form className="form" onSubmit={handleSubmits}>
    //             <div className="form__group">
    //               <MdEmail className="form__icon" />
    //               <input
    //                 className="form__input"
    //                 type="text"
    //                 name="email"
    //                 required
    //                 ref={isEmail}
    //               />
    //               <div className="form__input-after"></div>
    //               <label className="form__label" for="email">
    //                 Email
    //               </label>
    //             </div>
    //             <div className="form__group">
    //               <RiLockPasswordFill className="form__icon" />

    //               <input
    //                 className="form__input"
    //                 type="text"
    //                 value={account}
    //                 required
    //               />
    //               <div className="form__input-after"></div>
    //               <label className="form__label" for="passwoerd">
    //                 Password
    //               </label>
    //             </div>
    //             <div className="form__group">
    //               <button className="form__btn" type="submit">
    //                 <span className="form__btn-text">LogIn</span>
    //               </button>
    //             </div>
    //             <div className="form__group">

    //               <p className="form__text">
    //                 Don't have an account yet? Sign up from
    //                 <Link to="/signup">
    //                   <a href="#" className="form__link">
    //                     {" "}
    //                     here
    //                   </a>
    //                 </Link>
    //               </p>
    //             </div>
    //           </form>
    //           <Toaster position="top-right"
    //             reverseOrder={false} />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Login;
