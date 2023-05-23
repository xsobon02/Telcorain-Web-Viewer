import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import RainfallCanvas from "./RainfallCanvas";

import Links from "./Links";
import RainfallLinks from "./RainfallLinks";
import "/src/App.css";

export default function Map(props) {
  return (
    <div className="map-div">
      <MapContainer className="map" center={[50.075539, 14.4378]} zoom={11}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {props.raingrids.raingrids !== undefined &&
          props.showMapType === "rainfall" && (
            <RainfallCanvas
              raingrids={props.raingrids}
              time={props.time}
              sliderValue={props.sliderValue}
              setPointValue={props.setPointValue}
              setPointValues={props.setPointValues}
              setPointTimes={props.setPointTimes}
              showTotal={props.showTotal}
              setShowPointValuesChart={props.setShowPointValuesChart}
              setLatLong={props.setLatLong}
              select={props.select}
            />
          )}
        {props.showMapType === "links" && !props.linksHidden && (
          <Links
            auth={props.auth}
            linksType={props.linksType}
            links={props.links}
            polarLinks={props.polarLinks}
            bandwidthLinks={props.bandwidthLinks}
            selectedLink={props.selectedLink}
            setSelectedLink={props.setSelectedLink}
            showLinkInfo={props.showLinkInfo}
            setShowLinkInfo={props.setShowLinkInfo}
            minDistance={props.minDistance}
            maxDistance={props.maxDistance}
            realLinksData={props.realLinksData}
            fakeLinksData={props.fakeLinksData}
            setLinkInfoZ={props.setLinkInfoZ}
            setPointInfoZ={props.setPointInfoZ}
            isLoggedIn={props.isLoggedIn}
            setCmlOutput={props.setCmlOutput}
          />
        )}
        {props.showMapType === "rainfall" && !props.linksHidden && (
          <RainfallLinks
            auth={props.auth}
            linksType={props.linksType}
            raingrids={props.raingrids.raingrids}
            sliderValue={props.sliderValue}
            gridLinks={props.gridLinks}
            setSelectedLink={props.setSelectedLink}
            showLinkInfo={props.showLinkInfo}
            setShowLinkInfo={props.setShowLinkInfo}
            setLinkInfoZ={props.setLinkInfoZ}
            setPointInfoZ={props.setPointInfoZ}
            isLoggedIn={props.isLoggedIn}
            setCmlOutput={props.setCmlOutput}
          />
        )}
      </MapContainer>
    </div>
  );
}
