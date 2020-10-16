import React, { useState, useEffect} from 'react'

const Input = ({ setLocation }) => {
  const [city, setCity] = useState("");
  const onClick = () => {
    setLocation(city.trim());
    setCity("");
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        onClick()
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  })

  return (
    <div className="input">
      <input className="field"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        placeholder="Enter your city"
      />
      <button className="button" onClick={onClick}>Show</button>
    </div>
  );
};

export default Input