// MarvinOutput.tsx

import React from "react";
import "./MarvinOutput.css";

interface MarvinOutputProps {
  text: string;
}

function MarvinOutput({ text }: MarvinOutputProps): JSX.Element {
  return <div className="MarvinOutput">{text}</div>;
}

export default MarvinOutput;
