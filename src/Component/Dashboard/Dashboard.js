import React, { useEffect, useState, useRef } from 'react'
import { FaEthereum } from 'react-icons/fa';
import { contractAddress, contractAbi } from "../Utils/Constants"
import Modal from 'react-bootstrap/Modal';
import { IoMdClose } from "react-icons/io";
import { FaAddressCard, FaCity, FaDotCircle } from "react-icons/fa";
import { BsFileZipFill } from "react-icons/bs";
import { GiNurseFemale } from "react-icons/gi";
import { MdEmail, MdOutlineDateRange } from "react-icons/md";
import { loadAccountAddress } from "../Apis/Apis"
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "../Login/Login.css"
import { create } from "ipfs-http-client";
const client = create("https://ipfs.infura.io:5001/api/v0");
function Dashboard({ account }) {


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
            .required("City is mandatory"),
            // .matches(
            //     /([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/,
            //     "Must be Alphabet letters"
            // ),
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





    // let _fullName = useRef()
    let [_fullName, set_FullName] = useState('')
    let [_dOB, set_DoB] = useState('')
    let [_emailId, set_EmailId] = useState('')
    let [_userAddress, set_UserAddress] = useState('')
    let [_city, set_City] = useState('')
    let [_zip, set_Zip] = useState()
    let [_gender, set_Gender] = useState('')
    let [_religion, set__Religion] = useState('')
    let [data, setData] = useState([])
    const [modalShow, setModalShow] = useState(false);


    const [Url, setUrl] = useState(``);
    const [isUrl, setIsUrl] = useState(``);
    async function onChange(e) {
        const file = e.target.files[0];
        try {
            const added = await client.add(file);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            setUrl(url);
            console.log("Url", url);
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }
    async function isOnChange(e) {
        const file = e.target.files[0];
        try {
            const added = await client.add(file);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            setIsUrl(url);
            console.log("isUrl", url);
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }
    const dispalyData = async () => {
        try {
            let web3 = window.web3;

            let newArr = []
            // let fullname = _fullName.current.value
            let contractOf = new web3.eth.Contract(contractAbi, contractAddress);
            let UserMap = await contractOf.methods.UserMap(account).call()
            let _UserMap = await contractOf.methods._UserMap(account).call()
            // console.log("city", UserMap);
            console.log("_city", _UserMap);

            let address = UserMap.useraddress
            let name = UserMap.FullName
            let dob = UserMap.DoB
            let email = UserMap.EmailAddress
            let city = _UserMap.city
            let Idfront = UserMap.IdFront
            let zip = _UserMap.zip
            let gender = _UserMap.gender
            let religion = _UserMap.religion
            let IdBack = _UserMap.IdBack;
            let TotalData = { address: address, name: name, dob: dob, email: email, city: city, zip: zip, gender: gender, religion: religion, Idfront: Idfront, IdBack: IdBack }
            console.log("TotalData", TotalData);
            set_FullName(name)
            set_DoB(dob);
            set_EmailId(email)
            set_UserAddress(address)
            set_City(city)
            set_Zip(zip)
            set_Gender(gender)
            set__Religion(religion)
            setUrl(Idfront)
            setIsUrl(IdBack)
            // set_DoB(dob)
            // _fullName = name
            console.log("_fullName", _fullName);
            setData([TotalData])
            // console.log("data", data);
        } catch (e) {
            console.log("e", e);
        }
    }


    // const showData = async () => {

    //     try {
    //         let web3 = window.web3;
    //         // 
    //         let contractOf = new web3.eth.Contract(contractAbi, contractAddress);
    //         let UserMap = await contractOf.methods.UserMap(account).call()
    //         let _UserMap = await contractOf.methods._UserMap(account).call()
    //         let address = UserMap[0]
    //         let name = UserMap[1]
    //         let dob = UserMap[2]
    //         let email = UserMap[3]
    //         let city = UserMap[4]
    //         let Idfront = UserMap[5]
    //         let zip = _UserMap.zip
    //         let gender = _UserMap.gender
    //         let religion = _UserMap.religion
    //         let IdBack = _UserMap.IdBack;

    //         setModalShow(true)
    //         console.log("_fullName", _fullName);
    //     } catch (e) {
    //         console.log("e", e);
    //     }
    // }


    const UpdateSubmits = async (e) => {
        e.preventDefault();
        try {
            let web3 = window.web3;
            let add = await loadAccountAddress()
            let contractOf = new web3.eth.Contract(contractAbi, contractAddress);
            let UpdateUserInfo = await contractOf.methods.UpdateUserInfo(_fullName, _zip, _dOB, _emailId, _userAddress, _city, _gender, _religion, Url, isUrl).send({
                from: add
            })
            console.log("UpdateUserInfo", UpdateUserInfo);
            toast.success("✔️ data updated successfully");
            setModalShow(false)
            dispalyData()
            resetField("fullName");
            resetField("email");
            resetField("birthday")
            resetField("address")
            resetField("city")
            resetField("zip")
            resetField("gender")
            resetField("religion")
            // window.location.reload(false);
        } catch (e) {
            console.log("e", e);
            toast.error("❌ data Can't update");
        }
    }
    useEffect(() => {
        dispalyData()
    }, [])

    return (
        <div className='' style={{ background: "rgb(23, 23, 24)", height: "150vh" }}>
            <div className='container'>
                <div className='row d-flex justify-content-center pt-3'>
                    <div className='col-12'>
                        <h2>User Information</h2>
                    </div>
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className='col-6'>

                        <table className="table table-bordered table-responsive table-dark text-start">
                            <thead>
                                <tr>
                                    <th scope="col" colspan="2">Information</th>
                                </tr>
                            </thead>
                            {
                                data.map((items) => {
                                    return (
                                        <tbody key={items.address}>
                                            <tr>
                                                <td>Name</td>
                                                <td>{items.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email Id</td>
                                                <td>{items.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Date of Birth</td>
                                                <td>{items.dob}</td>
                                            </tr>
                                            <tr>
                                                <td>Address</td>
                                                <td>{items.address}</td>
                                            </tr>
                                            <tr>
                                                <td>City</td>
                                                <td>{items.city}</td>
                                            </tr>
                                            <tr>
                                                <td>Zip Code</td>
                                                <td>{items.zip}</td>
                                            </tr>
                                            <tr>
                                                <td>Gender</td>
                                                <td>{items.gender}</td>
                                            </tr>
                                            <tr>
                                                <td>Religion</td>
                                                <td>{items.religion}</td>
                                            </tr>
                                            <tr>
                                                <td>Idfront</td>
                                                <td><img src={items.Idfront} width="250px" /></td>
                                            </tr>
                                            <tr>
                                                <td>IdBack</td>
                                                <td><img src={items.IdBack} width="250px" /></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2"><button className='btn btn-primary' onClick={() => setModalShow(true)}>Update data</button></td>
                                            </tr>
                                        </tbody>
                                    )
                                })
                            }

                        </table>
                    </div>
                </div>
                {
                    modalShow ? (
                        <Modal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            size="lg"
                            centered
                        >

                            <Modal.Body style={{ backgroundColor: "#0d1f45" }}>
                                <div className=' d-flex justify-content-end mb-4'>
                                    <div className='col-12 d-flex justify-content-end'>
                                        <IoMdClose
                                            onClick={() => setModalShow(false)}
                                            size={28}
                                            style={{ color: "white", cursor: "pointer" }}
                                        />
                                    </div>
                                </div>
                                {/* <div className="overlay"> */}
                                <div className="login">
                                    <div className="login__inner" style={{ marginLeft: "-100px" }}>

                                        <div className="login__content">
                                            <div className="login__form">
                                                <form className="form"
                                                    onSubmit={UpdateSubmits}
                                                >
                                                    <div className="form__group">
                                                        <MdEmail className="form__icon" />
                                                        <input
                                                            className="form__input"
                                                            type="text"
                                                            name="FullName"
                                                            value={_fullName}
                                                            onChange={(e) => set_FullName(e.target.value)}
                                                            pattern="[A-Za-z]{2}"
                                                            required
                                                        // ref={_fullName.value}
                                                        />
                                                        <div className="form__input-after"></div>
                                                        <label className="form__label" for="FullName">
                                                            Full Name
                                                        </label>
                                                    </div>
                                                    <div className="form__group">
                                                        <MdOutlineDateRange className="form__icon" />
                                                        <input
                                                            className="form__input"
                                                            type="text"
                                                            name="birthday"
                                                            value={_dOB}
                                                            onChange={(e) => set_DoB(e.target.value)}
                                                        // ref={_dOB}
                                                        />

                                                    </div>
                                                    <div className="form__group">
                                                        <MdEmail className="form__icon" />
                                                        <input
                                                            className="form__input"
                                                            type="text"
                                                            name="email"
                                                            value={_emailId}
                                                            onChange={(e) => set_EmailId(e.target.value)}
                                                            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                                                            required
                                                        // ref={_emailId}
                                                        />
                                                        <div className="form__input-after"></div>
                                                        <label className="form__label" for="email">
                                                            Email
                                                        </label>
                                                    </div>
                                                    <div className="form__group">
                                                        <FaAddressCard className="form__icon" />
                                                        <input
                                                            className="form__input"
                                                            type="text"
                                                            name="address"
                                                            value={_userAddress}
                                                            onChange={(e) => set_UserAddress(e.target.value)}
                                                        // ref={_userAddress}
                                                        />
                                                        <div className="form__input-after"></div>
                                                        <label className="form__label" for="address">
                                                            Address
                                                        </label>
                                                    </div>
                                                    <div className="form__group">
                                                        <FaCity className="form__icon" />
                                                        <input
                                                            className="form__input"
                                                            type="text"
                                                            name="City"
                                                            value={_city}
                                                            onChange={(e) => set_City(e.target.value)}
                                                        // ref={_city}
                                                        pattern="([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})"
                                                        />
                                                        <div className="form__input-after"></div>
                                                        <label className="form__label" for="City">
                                                            City
                                                        </label>
                                                    </div>
                                                    <div className="form__group">
                                                        <BsFileZipFill className="form__icon" />
                                                        <input
                                                            className="form__input"
                                                            type="zip"
                                                            name="Zip"
                                                            placeholder="Zip Code"
                                                            pattern="[0-9]{5}"
                                                            max="99999"
                                                            value={_zip}
                                                            onChange={(e) => set_Zip(e.target.value)}
                                                        // ref={_zip}
                                                        />
                                                        <div className="form__input-after"></div>
                                                        <label className="form__label" for="Zip">
                                                            Zip Code
                                                        </label>
                                                    </div>
                                                    <div className="pb-3 mt-3" style={{ borderBottom: "0.1rem solid rgba(255, 255, 255, 0.3)", width: "100%" }}>
                                                        <GiNurseFemale className="form__icon" size={30} /><span>Gender</span><br />
                                                        {/* <span>Gender</span><br />
                                                        <input type="radio" id="male"  value="male" checked={_gender === 'male'} onChange={(e) => set_Gender(e.target.value)}/>
                                                        <label for="male">Male</label><br />
                                                        <input type="radio" id="female"  value="female" checked={_gender === 'Female'}  onChange={(e) => set_Gender(e.target.value)}/>
                                                        <label for="female">Female</label> */}
                                                        <input type="radio" id="html" name="fav_language" checked={_gender === 'male'} value="male" onChange={(e) => set_Gender(e.target.value)}  className='ms-5'/>
                                                        <label for="html">Male</label><br />
                                                        <input type="radio" id="female" name="fav_language" checked={_gender === "female"} value="female" onChange={(e) => set_Gender(e.target.value)}  className='ms-5'/>
                                                        <label for="female">Female</label>
                                                        
                                                        {/* <input
                                                            className="form__input"
                                                            type="text"
                                                            name="gender"
                                                            value={_gender}
                                                            onChange={(e)=>set_Gender(e.target.value)}
                                                        
                                                        /> */}
                                                        {/* <input type="radio" name="gender"
                                                            
                                                            
                                                            checked={_gender === 'male'}
                                                            value="Male" 
                                                            onChange={(e) => set_Gender(e.target.value)} /> Male
                                                        <input type="radio" name="gender"
                                                        checked={_gender === 'Female'}
                                                            
                                                            value="Female"
                                                            onChange={(e) => set_Gender(e.target.value)}
                                                        /> Female */}
                                                        {/* <div className="form__input-after"></div>
                                                        <label className="form__label" for="gender">
                                                            Gender
                                                        </label> */}
                                                    </div>
                                                    <div className="form__group">
                                                        <FaDotCircle className="form__icon" size={10} />
                                                        <input
                                                            className="form__input"
                                                            type="text"
                                                            name="religion"
                                                            value={_religion}
                                                            onChange={(e) => set__Religion(e.target.value)}
                                                        // ref={_religion}
                                                        />
                                                        <div className="form__input-after"></div>
                                                        <label className="form__label" for="religion">
                                                            Religion
                                                        </label>
                                                    </div>

                                                    <div className="form__group">
                                                        {/* <FaDotCircle className="form__icon" size={10}/> */}
                                                        <label for="img1">IdFront</label>&nbsp;
                                                        <input
                                                            type="file"
                                                            id="img1"
                                                            name="img1"
                                                            onChange={onChange}
                                                        />
                                                    </div>
                                                    <div>{Url && <img src={Url} width="300px" />}</div>
                                                    <div className="form__group">
                                                        {/* <FaDotCircle className="form__icon" size={10}/> */}
                                                        <label for="img">IdBack</label>&nbsp;
                                                        <input
                                                            type="file"
                                                            id="img"
                                                            name="img"

                                                            onChange={isOnChange}
                                                        />
                                                    </div>
                                                    <div>{isUrl && <img src={isUrl} width="300px" />}</div>
                                                    <div className="form__group">
                                                        <button className="form__btn" type='submit'>
                                                            <span className="form__btn-text">Update Data</span>
                                                        </button>
                                                    </div>

                                                </form>
                                                {/* <Toaster position="top-right"
                                reverseOrder={false} /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* </div> */}
                            </Modal.Body>
                            {/* <Modal.Footer style={{ backgroundColor: "#0d1f45" }}>
                                <button >Close</button>
                            </Modal.Footer> */}
                        </Modal>
                    ) : (<>
                    </>)
                }
            </div>
        </div>
    )
}

export default Dashboard