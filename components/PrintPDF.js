import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";



const PrintPDF = (inventoryhtml) => {
  


  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: inventoryhtml,
      base64: false,
    });

    const share=await shareAsync(file.uri)
  

  };

  return generatePdf();
};

export default PrintPDF;


