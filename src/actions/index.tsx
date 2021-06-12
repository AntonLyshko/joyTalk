import axios from "axios";
import fs from "fs";

async function syntesize(text: string) {
  try {
    const response = await axios.post(`http://127.0.0.1:5000/api/syntesis`, { text });

    return response.data;
  } catch (error) {}
}

async function sendRecoding(data: any) {
  try {
    var fileReader = new FileReader();
    fileReader.readAsArrayBuffer(data.blob);
    fileReader.onload = async () => {
      fs.writeFileSync(
        "C:/Users/Anton/Desktop/joy-talk/backend/filestore/me.wav",
        Buffer.from(new Uint8Array(fileReader.result))
      );
      const response = await axios.post(`http://127.0.0.1:5000/api/text2speech`, { data });
      return response.data;
    };
  } catch (error) {
    console.log("error", error);
  }
}

export { syntesize, sendRecoding };
