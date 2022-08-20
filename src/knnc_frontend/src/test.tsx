import React, { useEffect, useLayoutEffect, useState } from "react";

type Props = {};

const Test = (props: Props) => {
  const [first, setFirst] = useState(1);

  useEffect(() => {
    console.log("ssss");
  }, []);
  return (
    <div>
      <button onClick={() => setFirst((prev) => prev + 1)}>TTTTTTTTTTTT</button>
      <div>{first}</div>
    </div>
  );
};

export default Test;
