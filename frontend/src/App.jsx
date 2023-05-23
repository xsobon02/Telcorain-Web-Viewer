import { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import MapType from "./components/MapType";
import Menu from "./components/Menu";
import LinksFilter from "./components/LinksFilter";
import LinkInfo from "./components/LinkInfo";
import LinksType from "./components/LinksType";
import PointValuesChart from "./components/PointValuesChart";
import Slider from "./components/Slider";
import Time from "./components/Time";
import "./App.css";
import Unit from "./components/Unit";
import Scale from "./components/Scale";
import TimeWindow from "./components/TimeWindow";
import { THIS_URL } from "./constants/constants";

export default function App() {
  const [links, setLinks] = useState([
    "1s10",
    "ip10",
    "ip20C",
    "ip20E",
    "ip20G",
    "ip20S",
    "ip50",
  ]);
  const [filter, updateFilter] = useImmer({
    all: true,
    "1s10": true,
    ip10: true,
    ip20C: true,
    ip20E: true,
    ip20G: true,
    ip20S: true,
    ip50: true,
  });
  const [polarLinks, setPolarLinks] = useState(["H", "V"]);
  const [polarFilter, updatePolarFilter] = useImmer({
    all: true,
    H: true,
    V: true,
  });

  const [bandwidthLinks, setBandwidthLinks] = useState([
    "X",
    "Ku",
    "K",
    "Ka",
    "V",
    "W",
  ]);
  const [bandwidthFilter, updateBandwidthFilter] = useImmer({
    X: true,
    Ku: true,
    K: true,
    Ka: true,
    V: true,
    W: true,
  });

  const [showMapType, setShowMapType] = useState("rainfall");

  const [fakeLinksData, setFakeLinksData] = useState([{}]);
  const [realLinksData, setRealLinksData] = useState([{}]);
  const [linksType, setLinksType] = useState([{}]);
  const [cmlOutput, setCmlOutput] = useState();
  const [linksHidden, setLinksHidden] = useState(false);

  const [selectedLink, setSelectedLink] = useState({});
  const [showLinkInfo, setShowLinkInfo] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [filterHeader, setFilterHeader] = useState("Technologies");

  const [minDistance, setMinDistance] = useState(0);
  const [maxDistance, setMaxDistance] = useState(50000);

  const [raingrids, setRaingrids] = useState([]);
  const [sliderValue, setSliderValue] = useState(() => {
    if (sessionStorage.getItem("time")) {
      return Number(sessionStorage.getItem("time"));
    }
    return 24;
  });
  const [time, setTime] = useState("");

  const [pointValue, setPointValue] = useState("-");
  const [pointValues, setPointValues] = useState([]);
  const [pointTimes, setPointTimes] = useState([]);
  const [showPointValuesChart, setShowPointValuesChart] = useState(false);
  const [latLong, setLatLong] = useState();

  const [gridLinks, setGridLinks] = useState();

  const [showTotal, setShowTotal] = useState(false);

  const [linkInfoZ, setLinkInfoZ] = useState(998);
  const [pointInfoZ, setPointInfoZ] = useState(998);

  const [select, setSelect] = useState("1");

  const [auth, setAuth] = useState({
    isAuth: false,
    token: undefined,
    authLoading: false,
    userId: undefined,
    error: undefined,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getLinkData() {
    fetch(`${THIS_URL}/links/fakelinks`)
      .then((response) => response.json())
      .then((data) => {
        setFakeLinksData(data);
        setLinksType(data);
      });
    if (isLoggedIn) {
      fetch(`${THIS_URL}/links/reallinks`, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
        .then((response) => response.json())
        .then((data) => setRealLinksData(data));
    }
  }

  async function getGrids() {
    fetch(`${THIS_URL}/output/raingrids`)
      .then((response) => response.json())
      .then((data) => {
        setRaingrids(data);
        setTime(
          data.raingrids[
            sessionStorage.getItem("time")
              ? Number(sessionStorage.getItem("time"))
              : 24
          ].time
        );
        setGridLinks(
          data.raingrids[
            sessionStorage.getItem("time")
              ? Number(sessionStorage.getItem("time"))
              : 24
          ].links
            .replace("[", "")
            .replace("]", "")
            .split(", ")
            .map((item) => {
              return Number(item);
            })
        );
      });
  }

  async function getCmlData() {
    if (isLoggedIn) {
      fetch(`${THIS_URL}/influx/realtimedata`, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCmlOutput(data);
        });
    }
  }

  useEffect(() => {
    getLinkData();
    if (localStorage.getItem("token") && localStorage.getItem("userId")) {
      setIsLoggedIn(true);
      setAuth({
        isAuth: true,
        token: localStorage.getItem("token"),
        authLoading: false,
        userId: localStorage.getItem("userId"),
        error: undefined,
      });
    }

    getCmlData();
    const interval = setInterval(() => {
      getCmlData();
    }, 120000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  useEffect(() => {
    getGrids();
    const interval = setInterval(() => {
      getGrids();
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Navbar setShowMenu={setShowMenu} />
      {isLoggedIn && (
        <MapType
          showMapType={showMapType}
          setShowMapType={setShowMapType}
          showMenu={showMenu}
        />
      )}
      {isLoggedIn && showMapType === "rainfall" && (
        <Unit
          showTotal={showTotal}
          setShowTotal={setShowTotal}
          setPointValue={setPointValue}
          showMenu={showMenu}
          setShowPointValuesChart={setShowPointValuesChart}
          setShowLinkInfo={setShowLinkInfo}
        />
      )}
      {isLoggedIn && (
        <LinksType
          linksType={linksType}
          setLinksType={setLinksType}
          realLinksData={realLinksData}
          fakeLinksData={fakeLinksData}
          showMenu={showMenu}
          linksHidden={linksHidden}
          setLinksHidden={setLinksHidden}
        />
      )}
      {showLinkInfo && isLoggedIn && (
        <LinkInfo
          selectedLink={selectedLink}
          showLinkInfo={showLinkInfo}
          setShowLinkInfo={setShowLinkInfo}
          cmlOutput={cmlOutput}
          linksType={linksType}
          realLinksData={realLinksData}
          linkInfoZ={linkInfoZ}
          setLinkInfoZ={setLinkInfoZ}
          pointInfoZ={pointInfoZ}
          setPointInfoZ={setPointInfoZ}
          setShowPointValuesChart={setShowPointValuesChart}
          select={select}
        />
      )}
      {showPointValuesChart && (
        <PointValuesChart
          setShowPointValuesChart={setShowPointValuesChart}
          setShowLinkInfo={setShowLinkInfo}
          pointValues={pointValues}
          pointTimes={pointTimes}
          latLong={latLong}
          pointInfoZ={pointInfoZ}
          setPointInfoZ={setPointInfoZ}
          linkInfoZ={linkInfoZ}
          setLinkInfoZ={setLinkInfoZ}
          showTotal={showTotal}
        />
      )}
      {showMenu && (
        <Menu
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          auth={auth}
          setAuth={setAuth}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setLinksType={setLinksType}
          fakeLinksData={fakeLinksData}
        />
      )}
      {showMapType === "rainfall" && raingrids.raingrids !== undefined && (
        <>
          <Slider
            raingrids={raingrids.raingrids}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
            time={time}
            setTime={setTime}
            gridLinks={gridLinks}
            setGridLinks={setGridLinks}
          />
          <Time
            raingrids={raingrids.raingrids}
            sliderValue={sliderValue}
            pointValue={pointValue}
            showTotal={showTotal}
          />
          <Scale />
        </>
      )}
      {linkInfoZ >= pointInfoZ && showLinkInfo && (
        <TimeWindow
          auth={auth}
          setCmlOutput={setCmlOutput}
          isLoggedIn={isLoggedIn}
          select={select}
          setSelect={setSelect}
        />
      )}
      {linksType.length === 1 || raingrids.raingrids === undefined ? (
        <div className="loading">
          <span>Loading </span>
          <span className="material-symbols-outlined">autorenew</span>
        </div>
      ) : (
        <>
          <Map
            auth={auth}
            linksType={linksType}
            links={links}
            polarLinks={polarLinks}
            bandwidthLinks={bandwidthLinks}
            filterHeader={filterHeader}
            showMapType={showMapType}
            setShowMapType={setShowMapType}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            setShowLinkInfo={setShowLinkInfo}
            minDistance={minDistance}
            maxDistance={maxDistance}
            raingrids={raingrids}
            time={time}
            sliderValue={sliderValue}
            gridLinks={gridLinks}
            setPointValue={setPointValue}
            setPointValues={setPointValues}
            setPointTimes={setPointTimes}
            realLinksData={realLinksData}
            fakeLinksData={fakeLinksData}
            showTotal={showTotal}
            linksHidden={linksHidden}
            setShowPointValuesChart={setShowPointValuesChart}
            setLatLong={setLatLong}
            setLinkInfoZ={setLinkInfoZ}
            setPointInfoZ={setPointInfoZ}
            isLoggedIn={isLoggedIn}
            setCmlOutput={setCmlOutput}
            select={select}
          />
          {showMapType === "links" && linksType === realLinksData && (
            <LinksFilter
              links={links}
              setLinks={setLinks}
              filter={filter}
              updateFilter={updateFilter}
              polarLinks={polarLinks}
              setPolarLinks={setPolarLinks}
              polarFilter={polarFilter}
              updatePolarFilter={updatePolarFilter}
              filterHeader={filterHeader}
              setFilterHeader={setFilterHeader}
              minDistance={minDistance}
              maxDistance={maxDistance}
              setMinDistance={setMinDistance}
              setMaxDistance={setMaxDistance}
              bandwidthLinks={bandwidthLinks}
              setBandwidthLinks={setBandwidthLinks}
              bandwidthFilter={bandwidthFilter}
              updateBandwidthFilter={updateBandwidthFilter}
            />
          )}
        </>
      )}
    </div>
  );
}
