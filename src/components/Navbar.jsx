import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import FilterDramaTwoToneIcon from '@mui/icons-material/FilterDramaTwoTone';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

const citySuggestions = [
  "London", "New York", "Bangalore", "Chennai", "Delhi", "Hyderabad", "Mumbai", "Kolkata"
];

const Navbar = ({ onSearch, onLocationSearch, cityInput, setCityInput, onClearInput }) => {
  const handleSearchClick = () => {
    if (cityInput.trim()) {
      onSearch(cityInput.trim());
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onClearInput();
          onLocationSearch(latitude, longitude);
        },
        (error) => {
          alert("Unable to retrieve your location.");
          console.error(error);
        }
      );
    } else {
      alert("Geolocation not supported.");
    }
  };

  return (
    <nav
      style={{
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
        padding: "10px 30px",
      }}
    >
      {/* Logo */}
    <div style={{
  display: "flex",
  alignItems: "center",
  gap: "10px",
  position: "relative",
  top: "0",
  left: "0",
}}>
  <FilterDramaTwoToneIcon sx={{ fontSize: 40, color: "white" }} />
  <p style={{ fontWeight: "bold", fontSize: "24px", margin: 0 }}>Weather</p>
</div>


      {/* Search Input + Button */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Autocomplete
          freeSolo
          options={citySuggestions}
          inputValue={cityInput}
          onInputChange={(event, newValue) => {
            setCityInput(newValue);
          }}
          onChange={(event, newValue) => {
            if (newValue) onSearch(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search city 'London'"
              variant="outlined"
              size="small"
              sx={{
                width: "45rem",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "2rem",
                backdropFilter: "blur(6px)",
                transition: "all 0.3s ease",
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  paddingLeft: "10px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                  boxShadow: "0 0 12px rgba(255, 255, 255, 0.3)",
                },
                "& input::placeholder": {
                  color: "white",
                  opacity: 0.7,
                },
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <SearchIcon sx={{ color: "white", marginRight: "8px" }} />
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          )}
        />

        <Button
          variant="contained"
          className="glassy-card"
          onClick={handleSearchClick}
          style={{
            borderRadius: "6px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(6px)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 12px rgba(255,255,255,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Search
        </Button>
      </div>

      {/* Current Location Button */}
      <div
        onClick={handleCurrentLocation}
        style={{
          cursor: "pointer",
          marginTop: "1rem",
          marginRight: "25px",
          fontSize: "16px",
          fontWeight: "700",
          backgroundColor: 'rgba(255,255,255,0.1)',
          height: "35px",
          width: "150px",
          color: 'white',
          gap: '6px',
          borderRadius: "6px",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          border: "1px solid rgba(255,255,255,0.3)",
          backdropFilter: "blur(6px)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
          e.currentTarget.style.boxShadow = "0 0 12px rgba(255,255,255,0.3)";
          e.currentTarget.style.transform = "scale(1.03)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <GpsFixedIcon />
        <p style={{ fontSize: '14px', margin: 0 }}>Current Location</p>
      </div>
    </nav>
  );
};

export default Navbar;
