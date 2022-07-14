
import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbars from './Component/Navbar/Navbar';
import Login from "./Component/Login/Login"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';
import SignUp from './Component/SignUp/SignUp';
import Dashboard from './Component/Dashboard/Dashboard';
import Modal from 'react-bootstrap/Modal';
import { loadAccountAddress } from "./Component/Apis/Apis"
import Connect from './Component/Connect_MetamAsk/Connect';
function App() {
  // const [isUser, setIsUser] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isDispaly, setIsDispaly] = useState(true)
  let [account, setAccount] = useState('')

  const getAccount = async () => {
    try {
      let acc = await loadAccountAddress()
      console.log("acc", acc);
      if (acc == "No Wallet") {
        setModalShow(true)
        setIsDispaly(true)
      } else if (acc == "Connect to Rinkeby") {
        alert("Wrong Network, Please Connect to Rinkeby")
        console.log(acc);
        setIsDispaly(true)
      } else {
        setIsDispaly(false)
        // let myAcc = acc.substring(0, 3) + "..." + acc.substring(acc.length - 4);
        setAccount(acc);

      }
    } catch (e) {
      console.log("error while get account", e);
    }
  }
  const pageRefresh = () => {
    window.location.reload(false);
  }
  return (
    <div className="App">
      {/* {
        isDispaly ? <Connect getAccount={getAccount} /> : (
          <>
          <Login />
          <h2 style={{color: "black"}}>cjdjcds</h2>
          </>
        )
      } */}

      <BrowserRouter>
        <Navbars  isDispaly={isDispaly}/>
        <Routes>

          {
            isDispaly && (
              <>
                <Route path="/" element={<Connect getAccount={getAccount} account={account} />} />
              </>
            )
          }
          {
            !isDispaly && (<>
              <Route path='/login' element={<Login account={account} setIsDispaly={setIsDispaly}/>} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/dashboard' element={<Dashboard account={account}/>} />
            </>)
          }

          {/* {
            isDispaly ? (
              <>
                <Route path="/" element={<Connect getAccount={getAccount} account={account} />} />
              </>
            ) : (
              <>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
              </>
            )
          } */}





          {/* <Route path="/" element={<Connect />}/> */}
          {/* {
            !isUser && (
              <>
              <Route path="/" element={<Connect/>}/>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
              </>
            )
          }
          {
            isUser && (
              <>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path="/" element={<Connect/>}/>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                
              </>
            )
          }
             <Route path='*' element={<Navigate to={isUser ? "/dashboard" : "/"}/>}/> */}
          <Route path='*' element={<Navigate to={isDispaly ? "/" : "/login"} />} />
        </Routes>
      </BrowserRouter>


      {modalShow ? (<>  <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      // style={{backgroundColor: "#0d1f45"}}
      >
        <Modal.Header closeButton style={{ backgroundColor: "#0d1f45" }}>
          <Modal.Title id="contained-modal-title-vcenter">

          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#0d1f45" }}>
          <h4>Install MetaMask 👇</h4>
          <br />
          <a href='https://metamask.io/' target="_blank">Click Here</a>
          <br />

          <button className='btn btn-success' onClick={() => pageRefresh()}>Page Refresh</button>
        </Modal.Body>
      </Modal></>) : (<></>)}
    </div>
  );
}

export default App;
