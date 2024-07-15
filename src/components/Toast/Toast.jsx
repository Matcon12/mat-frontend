import React from "react"
import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

export default function Toast() {
  const notify = () => toast("Success !")

  return (
    <div>
      {/* <button onClick={notify}>Notify !</button> */}
      <ToastContainer />
    </div>
  )
}
