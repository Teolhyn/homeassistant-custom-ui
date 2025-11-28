import React, { useState } from "react";

interface CircularSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export default function CircularSlider({
  min = 0,
  max = 360,
  step = 1,
  value: propValue,
  onChange,
  className = "",
}: CircularSliderProps) {
  const [internal, setInternal] = useState(propValue ?? 0);
  const value = propValue ?? internal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    if (onChange) onChange(v);
    if (propValue === undefined) setInternal(v);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleChange}
      className={`range-circular ${className}`}
      style={{ ["--value" as any]: value }}
    />
  );
}

