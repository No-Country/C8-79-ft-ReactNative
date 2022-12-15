import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";



const PrintPDF = (d) => {
  


  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: d,
      base64: false,
    });

    const share=await shareAsync(file.uri)
  

  };

  return generatePdf();
};

export default PrintPDF;


