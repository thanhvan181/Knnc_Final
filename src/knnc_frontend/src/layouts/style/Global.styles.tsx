import React from "react";
import { createGlobalStyle } from "styled-components";

import "antd/dist/antd.css";
import "antd/dist/antd.variable.min.css";

const StyledGlobal = createGlobalStyle`
  :root {
    --color: #0A263C;
    --gray-1: #F2F2F2;
    --gray-2: #F8F8F8;
    --gray-3: #F3F4F6;
    --gray-4: #E5E7EB;
    --gray-5: #D6D6D6;
    --gray-6: #D1D5DB;
    --green-1: #96FDB5;
    --green-2: #85FFB1;
    --green-3: #6EE7B7;
    --primary: #42a5f4;
    --red-1: #FF6666;
    --red-2: #D70018;
    --info-1: #6BCEFF;
    --info-2: #00B0D7;
    --yellow-1: #F5D63D;
    --yellow-2: #FCD34B;
    --cyan-1: #C6D8FB;
    --cyan-2: #93C5FD;
    --cyan-3: #A5B4FC;
    --orange-1: #FDBA74;
    --orange-2: #FDA363;
    --palette-1: #FFB8B8;
    --palette-2: #FFADB6;
    --palette-3: #FDA4AF;
    --palette-4: #FFA3A3;
    --palette-5: #FCA5A5;
    --magenta-1: #FF94EB;
    --magenta-2: #FFD1E1;
    --magenta-3: #F9A8D4;
    --magenta-4: #FF85C0;
    --purple-1: #EFC2FF;
    --purple-2: #E0B3FF;
    --purple-3: #D8A8FF;
    --purple-4: #C4B5FD;
  }
  * {
    box-sizing: border-box;
  }
  body, html {
    font-size: 14px;
    font-weight: 400;
    font-family: Arial, Helvetica, sans-serif;
    font-style: normal;
    text-rendering: optimizeLegibility;
    color: var(--color);
    line-height: 1.15;
   
  }
  body {
    margin: 0;
    padding: 0;
    
  }
  img {
     color: red;
  }
  a {
    text-decoration: none;
  }
  input, textarea, button {
    &:focus, &:active {
      box-shadow: none !important;
      outline: 0;
    }
  }
  img {
    border-style: none;
    vertical-align: middle;
  }
  
  .ant-message {
    z-index: 99999;
  }
`;

type Props = {
    children: React.ReactNode;
};

const GlobalStyled = ({ children }: Props) => {
    return (
        <>
            {children}
            <StyledGlobal />
        </>
    );
};

export default GlobalStyled;