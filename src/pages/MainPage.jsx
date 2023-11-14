import { useEffect, useRef, useState } from "react";
import "../style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "../store/actions/translateActions";
import Select from "react-select";
import { clearAnswer } from "../store/slices/translateSlice";
import axios from "axios";
import { speechOptions } from "../constants";

const MainPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.translateSlice);
  const sourceRef = useRef();
  //* secilen dillerin state i
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  const [text, setText] = useState("");

  // dillerin verisini ceker
  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  // statelerin degerlerini degistirir
  const handleChange = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    // text alanlarını temızle
    setText("");
    dispatch(clearAnswer());
  };

  const handleClick = async () => {
    dispatch(translateText({ sourceLang, targetLang, text }));
    const res = await axios.get(
      `https://text-to-speech27.p.rapidapi.com/speech?text=${text}&lang=${sourceLang.value}`,
      speechOptions
    );
  };
  return (
    <div id="main-page">
      <div className="container">
        <h1>Translate App</h1>
        {/* üst kısım */}
        <div className="upper">
          <Select
            className="react-select"
            isDisabled={state.isLoading}
            isLoading={state.isLoading}
            options={state.languages}
            value={sourceLang}
            onChange={setSourceLang}
          />
          <button onClick={handleChange}>Change Languages</button>
          <Select
            className="react-select"
            isDisabled={state.isLoading}
            isLoading={state.isLoading}
            options={state.languages}
            value={targetLang}
            onChange={setTargetLang}
          />
        </div>
        {/* alt kısım */}
        <div className="bottom">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <textarea disabled value={state.answer}></textarea>
        </div>
        <button onClick={handleClick} id="translate">
          Translate
        </button>
      </div>
    </div>
  );
};

export default MainPage;
