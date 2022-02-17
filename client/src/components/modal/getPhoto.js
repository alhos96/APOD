import axios from "axios";
import moment from "moment";

export const getPhoto = async (setState, date, setIsLoading) => {
  let formatedBirthday = moment(date).format("YYYY-MM-DD");

  try {
    let data = await axios
      .get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}&date=${formatedBirthday}`)
      .then((res) => {
        console.log(res);
        setState(res.data);
      });

    if (!data) throw new Error("No movies recieved...");
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};
