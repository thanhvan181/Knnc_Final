import React from "react";
import { render } from "react-dom";
import {createRoot} from "react-dom/client"
import { knnc_backend } from "../../declarations/knnc_backend";


const AppRoot = () => {
  return <>
    Hi there
  </>
}

const container = document.querySelector(".app")
const root = createRoot(container)
root.render(<AppRoot/>)
