import { Polyline } from "react-leaflet/Polyline";
import { useImmer } from "use-immer";
import { THIS_URL } from "../constants/constants";

export default function Links(props) {
  let defaultLinksObject = {};
  let linksObject = {};
  let polarLinksObject = {};

  function selectLink(link) {
    props.setSelectedLink(link);
    props.setLinkInfoZ(999);
    props.setPointInfoZ(998);
    if (!props.showLinkInfo) props.setShowLinkInfo(true);
  }

  props.linksType.links.map((element, index) => {
    defaultLinksObject[element.properties.id] = element.properties.defaultColor;
  });

  props.linksType.links.map((element, index) => {
    linksObject[element.properties.id] = element.properties.color;
  });
  const [colors, updateColors] = useImmer(linksObject);

  props.linksType.links.map((element, index) => {
    polarLinksObject[element.properties.id] = element.properties.polarColor;
  });

  return (
    <>
      {
        <>
          {props.linksType.links.map((item, index) => {
            if (
              props.linksType === props.realLinksData &&
              props.links.some((tech) => tech === item.properties.technology) &&
              props.polarLinks.some(
                (polar) => polar === item.properties.polarization
              ) &&
              item.properties.distance >= props.minDistance &&
              item.properties.distance <= props.maxDistance &&
              props.bandwidthLinks.some(
                (band) => band === item.properties.freqBand
              )
            ) {
              return (
                <Polyline
                  key={index}
                  positions={[item.coordinates[0], item.coordinates[1]]}
                  pathOptions={{ color: colors[item.properties.id] }}
                  eventHandlers={{
                    mouseover: () => {
                      updateColors((draft) => {
                        draft[item.properties.id] = "black";
                      });
                    },
                    mouseout: () => {
                      updateColors((draft) => {
                        draft[item.properties.id] = item.properties.color;
                      });
                    },
                    click: () => {
                      selectLink(item.properties);
                    },
                  }}
                />
              );
            } else if (props.linksType === props.fakeLinksData) {
              return (
                <Polyline
                  key={index}
                  positions={[item.coordinates[0], item.coordinates[1]]}
                  pathOptions={{ color: colors[item.properties.id] }}
                  eventHandlers={{
                    mouseover: () => {
                      updateColors((draft) => {
                        draft[item.properties.id] = "black";
                      });
                    },
                    mouseout: () => {
                      updateColors((draft) => {
                        draft[item.properties.id] = item.properties.color;
                      });
                    },
                    click: () => {
                      selectLink(item.properties);
                    },
                  }}
                />
              );
            }
          })}
        </>
      }
    </>
  );
}
