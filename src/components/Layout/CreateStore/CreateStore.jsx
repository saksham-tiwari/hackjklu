import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./create.module.css";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import img1 from "../../Assets/img1.png";
import img2 from "../../Assets/img2.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import homeStyles from "../Homepage/Homepage.module.css";
import img3 from "../../Assets/img3.png";
import TimerIcon from "@mui/icons-material/Timer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import {
  addStoreDetails,
  checkStore,
} from "../../../redux/actions/LayoutAction";
import { setLoader, UnsetLoader } from "../../../redux/actions/LoaderActions";
import { message } from "antd";

const CreateStore = () => {
  let navigate = useNavigate();
  const [strName, setStrName] = useState("");
  const [ctr, setCtr] = useState(0);
  const [billTime, setBillTime] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [ShopCounter, setShopCounter] = useState([]);
  const [countertime, setCountertime] = useState([]);
  const [avgtime, setAvgtime] = useState([]);
  const [about, setAbout] = useState("");
  const [loc, setLoc] = useState({
    lat: 0,
    long: 0,
  });
  const [storeDetails, setStoreDetails] = useState([]);

  let dispatch = useDispatch();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  function showPosition(position) {
    setLoc({ lat: position.coords.latitude, long: position.coords.longitude });
  }

  const funSub = () => {
    let a = new Array(ctr);
    for (let i = 0; i < ctr; ++i) a[i] = 0;

    console.log(a);
    console.log(
      strName,
      parseInt(billTime),
      parseInt(from),
      parseInt(to),
      parseInt(ctr),
      loc.lat.toString(),
      loc.long.toString(),
      about
    );
    dispatch(setLoader());
    dispatch(
      addStoreDetails(
        strName,
        parseInt(ctr),
        about,
        a,
        a,
        a,
        parseFloat(loc.lat),
        parseFloat(loc.long)
      )
    )
      .then(() => {
        dispatch(UnsetLoader());
      })
      .catch(() => {

        dispatch(UnsetLoader());
      });
  };

  useEffect(() => {
    let user = localStorage.getItem("userid");
    if (user === null) {
      navigate("/");
    }
    dispatch(setLoader());
    dispatch(checkStore())
      .then((res) => {
        dispatch(UnsetLoader());
        console.log(storeDetails.name);
        console.log(res.data);
        setStoreDetails(res.data);
        console.log(storeDetails);
        setStrName(res.data.name);
        setAbout(res.data.Address);
        setCtr(res.data.counter);
        setLoc({
          lat: res.data.latti,
          long: res.data.long,
        });
      })
      .catch((err) => {
        console.log(err.status);
        dispatch(UnsetLoader());
        setStoreDetails([]);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div className={styles.box}>
          <h1>Edit Store Details</h1>
          <br />
          <StoreMallDirectoryIcon
            style={{ position: "relative", top: "10px" }}
            fontSize="large"
          />
          <input
            placeholder="Store Name"
            value={strName}
            onChange={(e) => {
              setStrName(e.target.value);
            }}
          ></input>
          <br />
          <select
            class="form-select"
            aria-label="Default select example"
            style={{
              width: "80%",
              marginLeft: "8%",
              borderColor: "#192839",
              borderWidth: "2px",
              padding: "6px 10px",
              borderRadius: "10px",
              fontSize: "16px",
            }}
          >
            <option selected>Store type</option>
            <option value="1">General store</option>
          </select>
          <br />
          <img
            src={img1}
            alt="counters"
            style={{ width: "7%", position: "relative", top: "10px" }}
          ></img>
          <input
            placeholder="Number of counters"
            value={ctr}
            onChange={(e) => {
              setCtr(e.target.value);
            }}
          ></input>
          <br />
          <LocationOnIcon
            style={{ position: "relative", top: "10px" }}
            fontSize="large"
          />
          <button className={styles.coord} onClick={getLocation}>
            Get coordinates
          </button>
          <p>
            {loc.lat},{loc.long}
          </p>
          <br />
          <img
            src={img2}
            alt="counters"
            style={{ width: "7%", position: "relative", top: "10px" }}
          ></img>
          <input
            placeholder="Billing Time"
            value={billTime}
            onChange={(e) => {
              setBillTime(e.target.value);
            }}
          ></input>
          <p
            style={{
              fontSize: "14px",
              marginLeft: "10px",
              position: "relative",
              top: "-15px",
              color: "gray",
            }}
          >
            Waiting time will be calculated automatically.
          </p>
          <AccessTimeIcon
            style={{ position: "relative", top: "10px" }}
            fontSize="large"
          />
          <input
            placeholder="From"
            style={{ width: "39%" }}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          ></input>
          <input
            placeholder="To"
            style={{ width: "39%" }}
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
            }}
          ></input>
          <br />
          <InfoIcon
            style={{ position: "relative", top: "-30px" }}
            fontSize="large"
          />
          <textarea
            placeholder="About"
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
          ></textarea>
          <button
            className={homeStyles.enterButton}
            style={{ width: "50%", marginLeft: "15%", marginTop: "10px" }}
            onClick={() => funSub()}
          >
            {storeDetails.name ? "Update" : "Create"}
          </button>
          <button
            className={homeStyles.enterButton}
            style={{ width: "50%", marginLeft: "15%", marginTop: "10px" }}
            onClick={() => navigate("/view-queue/id")}
          >
            View queue
          </button>
          <button
            className={homeStyles.enterButton}
            style={{ width: "50%", marginLeft: "15%", marginTop: "10px" }}
            onClick={() => navigate("/chart")}
          >
            View Store Analytics
          </button>
        </div>
        <div className={styles.box}>
          <h1>Store Preview</h1>
          <div className={styles.mobile}>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td className={styles.left}>
                    <h1 className={homeStyles.mainHead} style={{ margin: "0" }}>
                      {strName !== "" ? strName : "Store Name"}
                    </h1>
                    <table>
                      <tbody>
                        <tr>
                          <td style={{ padding: "10px" }}>
                            <div>
                              <img
                                src={img1}
                                alt="counters"
                                className={homeStyles.icons}
                              />
                              <div className={homeStyles.roundNo}>
                                {ctr ? ctr : "0"}
                              </div>
                              <div
                                style={{ textAlign: "center", width: "100%" }}
                              >
                                Counters
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "10px" }}>
                            <div>
                              <TimerIcon
                                style={{
                                  position: "relative",
                                  color: "#192839",
                                  fontSize: "38px",
                                  display: "inline-block",
                                  top: "6px",
                                }}
                              />
                              <span
                                className={homeStyles.yellowCapsule}
                                style={{
                                  margin: "0",
                                  position: "relative",
                                  bottom: "6px",
                                  padding: "2px 5px",
                                }}
                              >
                                Xhr XXmin XXXsec
                              </span>
                              <div
                                style={{ textAlign: "center", width: "100%" }}
                              >
                                Waiting time
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "10px" }}>
                            <div>
                              <img
                                src={img2}
                                alt="counters"
                                className={homeStyles.icons}
                              />
                              <div className={homeStyles.roundNo}>X</div>
                              <div
                                style={{ textAlign: "center", width: "100%" }}
                              >
                                Customers
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "10px" }}>
                            <div>
                              <img
                                src={img3}
                                alt="counters"
                                className={homeStyles.icons}
                              />
                              <span
                                className={homeStyles.yellowCapsule}
                                style={{
                                  margin: "0",
                                  position: "relative",
                                  bottom: "10px",
                                  padding: "2px 5px",
                                }}
                              >
                                {billTime ? billTime : "0"} min
                              </span>
                              <div
                                style={{ textAlign: "center", width: "100%" }}
                              >
                                Billing time
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <AccessTimeIcon
                      fontSize="large"
                      style={{ position: "relative", top: "10px" }}
                    />{" "}
                    Open {from ? from : "9"}.00AM-{to ? to : "6"}.00PM
                    <div>
                      <h1>Address</h1>
                      <p style={{ width: "90%" }}>
                        {about
                          ? about
                          : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur feugiat ex sed gravida. Proin eu orci varius, dictum erat ac, ullamcorper arcu. Aliquam erat volutpat.Nam sagittis leo ut nibh vehicula, in venenatis velit laoreet. "}{" "}
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <button
              className={homeStyles.enterButton}
              style={{ width: "40%", marginLeft: "30%", marginTop: "10px" }}
              onClick={() => navigate("/")}
            >
              Join Queue
            </button>
            <p style={{ textAlign: "center", fontSize: "14px" }}>
              Ensure to be physically near the store.
            </p>
          </div>
          <button
            className={homeStyles.enterButton}
            style={{
              width: "50%",
              marginLeft: "15%",
              marginTop: "10px",
              backgroundColor: "#FF8898",
              boxShadow: "0px 4px 15px #FF8898",
              borderColor: "#FF8898",
            }}
          >
            Close Store
          </button>
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default CreateStore;
