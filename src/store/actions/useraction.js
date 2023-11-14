/*
! createAsyncThunk
* asenkron aksiyonlar olusturmak icin kullanılır
* api istekleri atıp devamında sürec boyunca store u bilgilendirir.(pending,fullfilled,rejected)
? bizden iki parametre ister
> > aksiyonun type degeri
> > calısacak fonksiyon
> > bu fonksiyon genelde async islemler yapar (veritabanı sorguları)
 
*/
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("getUser", async () => {
  // asenkron islemler
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");

  // ! store a aktarılmasını istedıgımız verıyı return ederız
  return res.data;
});