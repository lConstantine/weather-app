import React, { useState } from 'react'

const Input = ({ setLocation }) => {
  const [city, setCity] = useState("");
  const onClick = () => {
    setLocation(city.trim());
    setCity("");
  };

  return (
    <div>
      <input
        onChange={(e) => setCity(e.target.value)}
        value={city}
        placeholder="Enter your city"
      />
      <button onClick={onClick}>Show</button>
    </div>
  );
};

export default Input