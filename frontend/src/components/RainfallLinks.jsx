import { Polyline } from "react-leaflet/Polyline";
import { useImmer } from "use-immer";

export default function RainfallLinks(props) {
  function selectLink(link) {
    props.setSelectedLink(link);
    props.setLinkInfoZ(999);
    props.setPointInfoZ(998);
    if (!props.showLinkInfo) props.setShowLinkInfo(true);
  }
  let linksObject = {};

  props.linksType.links.map((element, index) => {
    linksObject[element.properties.id] = "#2f2e3f";
  });
  const [colors, updateColors] = useImmer(linksObject);
  return (
    <>
      {props.linksType.links.map((item, index) => {
        if (props.gridLinks.some((id) => id === item.properties.id)) {
          return (
            <Polyline
              key={index}
              positions={[item.coordinates[0], item.coordinates[1]]}
              pathOptions={{ color: colors[item.properties.id] }}
              eventHandlers={{
                mouseover: () => {
                  updateColors((draft) => {
                    draft[item.properties.id] = "red";
                  });
                },
                mouseout: () => {
                  updateColors((draft) => {
                    draft[item.properties.id] = "#2f2e3f";
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
  );
}
