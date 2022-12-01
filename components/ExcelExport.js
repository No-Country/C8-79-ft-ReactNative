import {utils,write}from 'xlsx'
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const ExcelExport = (products) => {  

const hoja = utils.json_to_sheet(products);
const libro = utils.book_new();
utils.book_append_sheet(libro, hoja, "Inventario");
const libroGenerado = write(libro, {
  type: 'base64',
  bookType: "xlsx"
});
const uri = FileSystem.cacheDirectory + 'inventario.xlsx';

const generate= async () => {

  await FileSystem.writeAsStringAsync(uri, libroGenerado, {
    encoding: FileSystem.EncodingType.Base64
  });
  
  await Sharing.shareAsync(uri, {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    dialogTitle: 'Inventario',
    UTI: 'com.microsoft.excel.xlsx'
  });

}

  return  generate()
};

export default ExcelExport;


