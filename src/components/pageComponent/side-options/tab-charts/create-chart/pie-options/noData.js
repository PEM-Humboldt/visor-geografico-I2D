// function that verify if the data is all zero
export function isAllDataZero(dataChart,count){
    let isAllZero=true;
    for (let i = 0; i < dataChart.length; i++) {
        const e = dataChart[i];
        if(e[count] !== 0) {
            isAllZero = false;
            break;
        }
    }  
    return isAllZero;  
}