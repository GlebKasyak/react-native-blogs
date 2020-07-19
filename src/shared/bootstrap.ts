import { loadAppFonts } from "../../assets/fonts";
import DB from "../db";

export default async () => {
   try {
       await loadAppFonts();
       await DB.init();

       console.log("Database started....")
   } catch (err) {
       console.log(err)
   }
};
