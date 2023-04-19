import logo from "./logo.svg";
import waves from "./assets/waves.svg";
import loader from "./assets/loader.svg";
import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [solvedText, setSolvedText] = useState("");
  const [showModal, setShowModal] = React.useState(false);

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "535ef20deamshffb4b0c1ec9e42ap194445jsn1519cfa59221",
      "X-RapidAPI-Host": "openai80.p.rapidapi.com",
    },
    body: `{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"im getting the following error when im trying to code:${input}, can you explain why in the voice of a surfer bro"}]}`,
  };

  const handleKeydown = (event) => {
    if (event.keyCode === 13) {
      handleClick();
    }
  };

  const handleClick = () => {
    console.log("yooo");
    setShowModal(true);
    setLoading(true);
    fetch("https://openai80.p.rapidapi.com/chat/completions", options)
      .then((response) => response.json())
      .then((response) => setSolvedText(response.choices[0].message.content))
      .then(() => setLoading(false))
      .catch((err) => console.error(err));
  };

  return (
    <div className="bg-[url('./assets/waves.svg')] w-screen h-screen bg-no-repeat bg-bottom flex justify-center font-pen">
      <div className="w-11/12 sm:w-2/4 sm:h-2/3 rounded-3xl drop-shadow-2xl flex flex-col  items-center align-middle justify-center sm:bg-slate-100 sm:mt-28">
        <h1 className="font-extrabold text-3xl sm:text-6xl w-10/12 sm:w-2/3 text-center">
          Surfin' the Code Wave: Understanding Error Codes, Bro!
        </h1>
        <h2 className="w-full sm:w-11/12 text-3xl py-2 ">
          Dude, sometimes when you're ridin' the coding wave, you might wipeout
          and run into some error codes, man. But don't stress, bro! Just like a
          gnarly wave, those error codes are just signals from your code tellin'
          ya that somethin's not quite right, ya know?
        </h2>
        <h2 className="w-full sm:w-11/12 text-3xl py-2">
          But here's the deal, bro: just like when you're shreddin' the waves,
          you gotta understand those signals to get back on your board and ride
          the code wave again, dude! So, let's get into it and decode those
          error messages together, bro!
        </h2>
        <div className="relative w-11/12 md:w-2/3 mt-12">
          <input
            className="bg-white rounded-lg h-14 w-full z-30 md:text-center focus:outline-none pl-7 md:pl-0 text-2xl drop-shadow-xl"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste that gnarly error here bro"
            onKeyDown={handleKeydown}
          />
        </div>
        <button
          class="block text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-2xl rounded-lg mt-10  px-16 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={handleClick}
        >
          Submit
        </button>
        {showModal ? (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed  focus:outline-none w-full h-full">
            <div className="relativemy-6 mx-auto h-5/6 w-full">
              {/*content*/}
              <div className="border-0 rounded-lg px-16 relative flex flex-col bg-white outline-none focus:outline-none h-full w-full">
                {/*body*/}

                {loading ? (
                  <div className="flex justify-center items-center h-5/6">
                    <img className="w-36 h-36" src={loader} />
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-5/6">
                    <p className="my-4 text-slate-900 text-2xl sm:text-3xl sm:leading-relaxed overflow-scroll">
                      {solvedText}
                    </p>
                  </div>
                )}
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b ">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-4xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
