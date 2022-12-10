export const inventoryhtml =(productos) =>{
    return (

        `<html>
        <body>
          
            <style type="text/css">
              .tftable {font-size:12px;color:#333333;width:100%;border-width: 1px;border-color: #729ea5;border-collapse: collapse;}
              .tftable th {font-size:12px;background-color:#acc8cc;border-width: 1px;padding: 8px;border-style: solid;border-color: #729ea5;text-align:left;}
              .tftable tr {background-color:#d4e3e5;}
              .tftable td {font-size:12px;border-width: 1px;padding: 8px;border-style: solid;border-color: #729ea5;}
            </style>
            <h1>REPORTE DE INVENTARIO</h1>
            <h3>${new Date()} </h3>
  
              <table class="tftable" border="1">
               <tr>
                  <th>CODIGO</th>
                   <th>NOMBRE </th>
                   <th>PRECIO COMPRA </th>
                  <th>CANTIDAD</th>
                  <th>PRECIO VENTA</th>
               </tr>
  
               ${productos.map(item=>
                  `<tr>
                     <td>${item.codigo}</td>
                      <td>${item.nombre}</td>
                      <td>${item.precioCompra}</td>
                      <td>${item.cantidad}</td>
                      <td>${item.precioVenta}</td>
                  </tr>`)}
              </table>
         
        </body>
      </html>
    `


    )
} 
  