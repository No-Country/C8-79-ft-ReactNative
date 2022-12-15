export const pieChartHTML = (d) => {
  const total = d.reduce((prev, acc) => prev + acc.population, 0);

  const generateGradient = (i) => {
    let prev = 0;
    const arr = i.map((item, index) =>
      index === i.length - 1
        ? `${item.color} ${prev}%`
        : `${item.color} ${prev}%${(prev += (item.population * 100) / total)}%`
    );
    return arr;
  };

  const value = `conic-gradient(${[...generateGradient(d)]})`;

  return `<html>
        <body>
          
            <style type="text/css">

            body {
              background-color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
            }
            
            #my-pie-chart-container {
              display: flex;
              align-items: center;
            }
            
            #my-pie-chart {              
              background: ${value};
              border-radius: 50%;
                width: 150px;
                height: 150px;
            }
            
            #legenda {
              margin-left: 20px;
              background-color: white;
              padding: 5px;
            }
            
            .entry {
              display: flex;
              align-items: center;
            }
            
            .entry-color {
                height: 10px;
                width: 10px;
            }
            
            .entry-text {
              margin-left: 5px;
            }
       
            </style>

           

<div id="my-pie-chart-container">
  <div id="my-pie-chart"></div>

  <div id="legenda">
    
    ${d.map(
      (item) =>
        `<div class="entry">
      <div style=background-color:${item.color} class="entry-color"></div>
      <div class="entry-text">${(item.population * 100) / total}% ${
          item.name
        } </div>
    </div>`
    )}
  </div>
</div>
            
         
        </body>
      </html>
    `;
};
