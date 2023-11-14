import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constants";

// api'den dil verilerini alır
export const getLanguages = createAsyncThunk("getLanguages", async () => {
  // api 'isteği
  const res = await axios.request(options);

  const data = res.data.data.languages;

  /*
   * diziyi dönüp
   * herbir objesi için value ve label değerlerine
   * sahip yeni bir obje oluşturucaz
   */
  const refinedData = data.map((item) => ({
    value: item.code,
    label: item.name,
  }));

  // store'a gönderilecek veri
  return refinedData;
});

// çeviri işlemi yapar
export const translateText = createAsyncThunk("translate", async (params) => {
  console.log(params);
  // api isteği için gerekli ayarlar
  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", params.sourceLang.value);
  encodedParams.set("target_language", params.targetLang.value);
  encodedParams.set("text", params.text);

  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "75dc092df0msh3c03138e5cc1ea2p19035ejsn916bcc592247",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    data: encodedParams,
  };

  // api isteği atma
  const res = await axios.request(options);

  // store'a aktarma
  return res.data.data.translatedText;
});