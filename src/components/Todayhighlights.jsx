// TodayHighlights.jsx
import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import Highlightbox from "../../src/components/Highlightbox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompressIcon from "@mui/icons-material/Compress";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

const TodayHighlights = ({ weatherData, airQualityData }) => {
  const { main, visibility, sys } = weatherData;
  const airQualityIndex = airQualityData?.main?.aqi;
  const { co, no, no2, o3 } = airQualityData?.components || {};

  const renderAirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  const getAQIColor = (aqi) => {
    switch (aqi) {
      case 1:
        return "#3FB950";
      case 2:
        return "#FFD33D";
      case 3:
        return "#FFA500";
      case 4:
        return "#FF4C4C";
      case 5:
        return "#8B0000";
      default:
        return "#ccc";
    }
  };

  const highlights = [
    { title: "Humidity", value: `${main.humidity}%`, Icon: InvertColorsIcon },
    { title: "Pressure", value: `${main.pressure} hPa`, Icon: CompressIcon },
    { title: "Visibility", value: `${visibility / 1000} km`, Icon: VisibilityIcon },
    { title: "Feels Like", value: `${main.feels_like}°C`, Icon: DeviceThermostatIcon },
  ];

  return (
    <div
      className="glassy-card"
      style={{ color: "white", width: "1000px", height: "450px", borderRadius: "0.5rem", padding: "30px" }}
    >
      <div style={{ fontSize: "20px" }}>Today's Highlights</div>

      <div style={{ display: "flex", gap: "30px" }}>
        {/* Air Quality */}
        <div
          className="glassy-card"
          style={{ padding: "1rem", borderRadius: "0.5rem", marginTop: "21px", width: "460px" }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "22px",
              }}
            >
              <p style={{ margin: 0 }}>Air Quality Index</p>
              <div
                style={{
                  marginTop: "1rem",
                  marginLeft: "1rem",
                  fontSize: "14px",
                  fontWeight: "bold",
                  backgroundColor: getAQIColor(airQualityIndex),
                  height: "22px",
                  width: "80px",
                  borderRadius: "6px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                {renderAirQualityDescription(airQualityIndex)}
              </div>
            </div>
            <div>
              <AirIcon style={{ fontSize: "35px" }} />
              <div
                style={{
                  marginTop: "1rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "10px",
                }}
              >
                <div>
                  <p style={{ fontWeight: "bold" }}>CO</p>
                  <p>{co} µg/m³</p>
                </div>
                <div>
                  <p style={{ fontWeight: "bold" }}>NO</p>
                  <p>{no} µg/m³</p>
                </div>
                <div>
                  <p style={{ fontWeight: "bold" }}>NO₂</p>
                  <p>{no2} µg/m³</p>
                </div>
                <div>
                  <p style={{ fontWeight: "bold" }}>O₃</p>
                  <p>{o3} µg/m³</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sunrise and Sunset */}
        <div
          className="glassy-card"
          style={{ padding: "1rem", borderRadius: "0.5rem", marginTop: "21px", width: "460px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "22px", marginBottom: "10px" }}>
            <p style={{ margin: 0 }}>Sunrise And Sunset</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end", flex: 1 }}>
            <div style={{ textAlign: "center" }}>
              <WbSunnyIcon style={{ fontSize: "40px" }} />
              <p style={{ fontSize: "20px", marginTop: "5px" }}>{new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <NightsStayIcon style={{ fontSize: "40px" }} />
              <p style={{ fontSize: "20px", marginTop: "5px" }}>{new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "4px",
          marginTop: "10px",
        }}
      >
        {highlights.map((highlight, index) => (
          <Highlightbox
            key={index}
            title={highlight.title}
            value={highlight.value}
            Icon={highlight.Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default TodayHighlights;
