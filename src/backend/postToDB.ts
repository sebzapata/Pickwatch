import axios from 'axios';
import { FormData } from '../types/formData';

const postToDB = async (formData: FormData): Promise<void> => {
  const url = 'https://pickwatch-b68e.restdb.io/rest/form-data';

  try {
    await axios.post(url, formData,{
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY || ''
      }
    });
  } catch (e) {
    console.log("error", e)
  }
}

export default postToDB;