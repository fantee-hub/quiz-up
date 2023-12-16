import { createGlobalStyle } from "styled-components";

const Globalstyles = createGlobalStyle`
    *{
        padding:0;
        margin:0;
        box-sizing:border-box;
       
    }
    body{
        font-family: 'Nunito Sans', sans-serif;
        background: #e0e0e0;
    }
    a{
        text-decoration: none;
    }
    input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
      }

`;
export default Globalstyles;
