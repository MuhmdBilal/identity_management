import React, { useRef, useState } from "react";
import { MdEmail, MdOutlineDateRange } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaAddressCard, FaCity, FaDotCircle } from "react-icons/fa";
import { BsFileZipFill } from "react-icons/bs";
import { GiNurseFemale } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { contractAbi, contractAddress } from "../Utils/Constants";
import toast, { Toaster } from 'react-hot-toast';
// import { toast } from "react-toastify";

import { Form, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// import { useForm } from "react-hook-form";

import { ErrorMessage } from '@hookform/error-message';
import { loadAccountAddress } from "../Apis/Apis"
import { create } from "ipfs-http-client";
const client = create("https://ipfs.infura.io:5001/api/v0");

function SignUp({ account }) {
    let navigate = useNavigate();
    // let fullName = useRef("")
    let [fullName, setFullName] = useState()
    let [dOB, setDoB] = useState()
    let [emailId, setEmailId] = useState()
    let [userAddress, setUserAddress] = useState()
    let [city, setCity] = useState()
    let [zip, setZip] = useState()
    let [religion, setReligion] = useState()
    let [fullnameError, setFullNameError] = useState(false)
    // let dOB = useRef('')
    // let emailId = useRef('')

    // let userAddress = useRef('')
    // let city = useRef('');
    // let zip = useRef()
    // let gender = useRef('')
    let [gender, setgender] = useState('')
    // let religion = useRef('')
    const [file, setFile] = useState(``)
    const [file2, setFile2] = useState(``)
    const [idFront, setIdFront] = useState(``)
    const [idBack, setIdBack] = useState(``)
    // const [fileUrl, updateFileUrl] = useState(``)
    // const [oneFileUrl, updateOneFileUrl] = useState(``)
    // const [isFileUrl, setIsFileUrl] = useState(``);
    // const [oneIsFileUrl,setOneIsFileUrl] = useState(``)
     const onChange=(e)=> {

        setFile(e.target.files);
        setIdBack(URL.createObjectURL(e.target.files[0]));
        // console.log("fileUrl", fileUrl);
    }
    const isOnChange=(e)=> {
        setFile2(e.target.files);
        setIdFront(URL.createObjectURL(e.target.files[0]));
        // console.log("isFileUrl",isFileUrl);
    }
    const fullNameHandle = (e) => {
        let items = e.target.value
        setFullName(items)
        if (items ==! "/^[A-Za-z]+$/") {
            setFullNameError(true)
        } else {
            setFullNameError(false)
        }
    }

    const handleSubmits = async (e) => {
        e.preventDefault();
        try {
            const added = await client.add(file);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            setIdBack(url)
            // updateOneFileUrl(url);
            // console.log("url", url);
            // console.log("fileUrl", fileUrl);

            const addeds = await client.add(file2);
            const urls = `https://ipfs.infura.io/ipfs/${addeds.path}`;
            setIdFront(urls)
            // setOneIsFileUrl(urls);
            // console.log("url", urls);
            // console.log("isFileUrl",isFileUrl);
            let add = await loadAccountAddress()
            let web3 = window.web3;
            let contractOf = new web3.eth.Contract(contractAbi, contractAddress);
            let AddUser = await contractOf.methods.AddUser(fullName, dOB, emailId, userAddress, city, zip, gender, religion, url, urls).send({
                from: add
            })
            console.log("AddUser", AddUser);
            if (AddUser) {
                toast.success("✔️ data add successfully, please Login");
                navigate('/login')
            }
            let UserMap = await contractOf.methods.UserMap(account).call();
            if(emailId ==! UserMap.EmailAddress){
                toast.error("❌ Data add only One time");
            }
            // resetField("fullName");
            // resetField("email");
            // resetField("birthday")
            // resetField("address")
            // resetField("city")
            // resetField("zip")
            // resetField("gender")
            // resetField("religion")
            
            // console.log("AddUser", AddUser);
        } catch (e) {
            // toast.error("❌ Data add only One time");
            console.log("e", e);
        }
    }
    return (
        <div className="" style={{ background: "rgb(23, 23, 24)", height: "150vh" }}>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-3">
                        <h2>Sign Up</h2>
                    </div>

                </div>
                <form onSubmit={handleSubmits}>
                    <div className="row d-flex justify-content-center text-start ">
                        <div className="col-md-4">
                            <div className="mb-4">
                                <label for="fullName" className="form-label form-heading lable-text">full Name</label>
                                <input type="text" name="fullname" placeholder="Type full name" className="form-control "
                                    // ref={fullName}
                                    value={fullName}
                                    onChange={fullNameHandle}
                                    required
                                    pattern="[^,\s][^,]*[^,\s]*"
                                />
                            </div>
                            {fullnameError ? <span>Full name is mandatory</span> : ""}
                        </div>

                        <div className="col-md-4">
                            <div className="mb-4">
                                <label for="date" className="form-label form-heading lable-text">Date of Bitrh </label>
                                <input type="date" className="form-control input-color"
                                    // ref={dOB}
                                    value={dOB}
                                    required
                                    onChange={(e) => setDoB(e.target.value)}
                                    // {...register("birthday", { required: true })}
                                />
                                {/* {errors.birthday && <> &nbsp;<span style={{ color: "red" }}>{errors.birthday.message}</span></>} */}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-4">
                                <label for="username" className="form-label form-heading lable-text">Email Id</label>
                                <input type="text" placeholder="Type your email address" className="form-control input-color"
                                    // ref={emailId}
                                    value={emailId}
                                    required
                                    onChange={(e) => setEmailId(e.target.value)}
                                    pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                                />
                                
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-4">
                                <label for="password" className="form-label form-heading lable-text">Address</label>
                                <input type="text" placeholder="Enter Address" className="form-control input-color"
                                    // ref={userAddress}
                                    value={userAddress}
                                    required
                                    onChange={(e) => setUserAddress(e.target.value)}
                                />
                                
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-4">
                                <label for="password" className="form-label form-heading lable-text">City</label>
                                <input type="text" placeholder="Enter City" className="form-control input-color"
                                    // ref={city}
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    pattern="[^,\s][^,]*[^,\s]*"
                                />
                               
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-4">
                                <label for="password" className="form-label form-heading lable-text">Zip Code</label>
                                <input type="text" placeholder="Enter City" className="form-control input-color"
                                    // ref={zip}
                                    value={zip}
                                    required
                                    onChange={(e) => setZip(e.target.value)}
                                    pattern="[0-9]*"
                                    max="99999"
                                />
                                
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-4">
                                <label for="password" className="form-label form-heading lable-text">Gender</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                                        checked={gender === 'male'} 
                                        value="male" onChange={(e) => setgender(e.target.value)}/>
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                        checked={gender === 'female'}
                                        value="female" onChange={(e) => setgender(e.target.value)}   />
                                    <label className="form-check-label" for="flexRadioDefault2" >
                                        Female
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-4">
                                <label for="password" className="form-label form-heading lable-text">Religion</label>
                                <input type="text" placeholder="Enter Religion" className="form-control input-color"
                                    // ref={zip}
                                    // value={zip}
                                    required
                                    value={religion}
                                    onChange={(e) => setReligion(e.target.value)}
                                    pattern="[^,\s][^,]*[^,\s]*"
                                />
                                
                            </div>
                        </div>
                        {/* <div className="col-md-4">
                            <div className="mb-4">
                                <label for="password" classname="form-label form-heading lable-text">Religion</label>
                                <input type="text" placeholder="Enter Religion" classname="form-control "
                                   
                                    required
                                    value={religion}
                                    onChange={(e) => setReligion(e.target.value)}
                                    pattern="[^,\s][^,]*[^,\s]*"
                                />
                            </div>
                        </div> */}
                        <div className="col-md-5">
                            <div className="mb-3">
                                <label for="formFile" className="form-label">ID Front Side</label>
                                <input className="form-control" type="file" id="formFile" required onChange={isOnChange} />
                            </div>
                            <div>{idFront && <img src={idFront} width="300px" />}</div>
                            {/* <div class="mb-4">
                                <label for="password" class="form-label form-heading lable-text">Religion</label>
                                <input type="text" placeholder="Enter Religion" class="form-control input-color"
                                    {...register("religion", { required: true })}
                                />
                                {errors.religion && <> &nbsp;<span style={{ color: "red" }}>{errors.religion.message}</span></>}
                            </div> */}
                        </div>
                        <div className="col-md-5">
                            <div className="mb-3">
                                <label for="formFile" className="form-label">ID Back Side</label>
                                <input className="form-control" type="file" id="formFile" required onChange={onChange} />
                            </div>
                            <div>{idBack && <img src={idBack} width="300px" />}</div>
                        
                        </div>
                        <Toaster />
                    </div>
                    {/* <div className="row d-flex justify-content-center text-start ">
                        <div className="col-md-4">
                            <div class="mb-4">
                                <label for="date" class="form-label form-heading lable-text">Date of Bitrh </label>
                                <input type="date" class="form-control input-color"
                                    // ref={dOB}
                                    value={dOB}
                                    onChange={(e) => setDoB(e.target.value)}
                                    
                                />
                               
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="row d-flex justify-content-center text-start ">
                        <div className="col-md-4">
                            <div class="mb-4">
                                <label for="username" class="form-label form-heading lable-text">Email Id</label>
                                <input type="text" placeholder="Type your email address" class="form-control input-color"
                                    // ref={emailId}
                                    value={emailId}
                                    onChange={(e) => setEmailId(e.target.value)}
                                    
                                />
                                
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="row d-flex justify-content-center text-start ">
                        <div className="col-md-4">
                            <div class="mb-4">
                                <label for="password" class="form-label form-heading lable-text">Address</label>
                                <input type="text" placeholder="Enter Address" class="form-control input-color"
                                    // ref={userAddress}
                                    value={userAddress}
                                    onChange={(e) => setUserAddress(e.target.value)}
                                   
                                />
                                
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="row d-flex justify-content-center text-start ">
                        <div className="col-md-4">
                            <div class="mb-4">
                                <label for="password" class="form-label form-heading lable-text">City</label>
                                <input type="text" placeholder="Enter City" class="form-control input-color"
                                    // ref={city}
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    
                                />
                               
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="row d-flex justify-content-center text-start ">
                        <div className="col-md-4">
                            <div class="mb-4">
                                <label for="password" class="form-label form-heading lable-text">Zip Code</label>
                                <input type="text" placeholder="Enter City" class="form-control input-color"
                                    // ref={zip}
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value)}
                                    
                                />
                                
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="row d-flex justify-content-center text-start ">
                        <div className="col-md-4">
                            <div class="mb-4">
                                <label for="password" class="form-label form-heading lable-text">Gender</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                                        checked={gender ? 'male' : "female"} 
                                        value="male" onChange={(e) => setgender(e.target.value)}/>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Male
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                        checked={gender ? 'male' : "female"}
                                        value="female" onChange={(e) => setgender(e.target.value)}   />
                                    <label class="form-check-label" for="flexRadioDefault2" >
                                        Female
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="row d-flex justify-content-center text-start ">
                        <div className="col-md-4">
                            <div class="mb-4">
                                <label for="password" class="form-label form-heading lable-text">Religion</label>
                                <input type="text" placeholder="Enter Religion" class="form-control input-color"
                                    // ref={religion}
                                    value={religion}
                                    onChange={(e) => setReligion(e.target.value)}
                                   
                                />
                                
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="row d-flex justify-content-center text-start ">
                        <div className="col-md-5">
                            <div class="mb-3">
                                <label for="formFile" class="form-label">ID Front Side</label>
                                <input class="form-control" type="file" id="formFile" onChange={isOnChange} />
                            </div>
                            <div>{isFileUrl && <img src={isFileUrl} width="300px" />}</div>
                            <div class="mb-4">
                                <label for="password" class="form-label form-heading lable-text">Religion</label>
                                <input type="text" placeholder="Enter Religion" class="form-control input-color"
                                    {...register("religion", { required: true })}
                                />
                                {errors.religion && <> &nbsp;<span style={{ color: "red" }}>{errors.religion.message}</span></>}
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="row d-flex justify-content-center text-start ">
                        <div className="col-md-5">
                            <div class="mb-3">
                                <label for="formFile" class="form-label">ID Back Side</label>
                                <input class="form-control" type="file" id="formFile" onChange={onChange} />
                            </div>
                            <div>{fileUrl && <img src={fileUrl} width="300px" />}</div>
                            <div class="mb-4">
                                <label for="password" class="form-label form-heading lable-text">Religion</label>
                                <input type="text" placeholder="Enter Religion" class="form-control input-color"
                                    {...register("religion", { required: true })}
                                />
                                {errors.religion && <> &nbsp;<span style={{ color: "red" }}>{errors.religion.message}</span></>}
                            </div>
                        </div>
                    </div> */}
                    <div className="row d-flex justify-content-center mt-5">
                        <div className="col-md-5">
                            <div className="d-grid gap-2">
                                <button className="btn btn-success" size="lg" type="submit">
                                    signUp
                                </button>

                            </div>
                        </div>
                    </div>
                    <div className="form__group pb-5 pt-3">
                        <p className="form__text">
                            Already signup
                            <Link to="/login">
                                {" "}
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
    );
}

export default SignUp;
