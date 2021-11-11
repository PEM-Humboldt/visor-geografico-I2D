// this file contains the functions than format the text

// Capitalize the first letter of each word in a string
export var capitalizeFirstLetter=(str)=>{
    const arr = str.toLowerCase().split(" ");

    //loop through each element of the array and capitalize the first letter.   
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    
    //Join all the elements of the array back into a string 
    //using a blankspace as a separator 
    const str2 = arr.join(" ");
    return str2
}


// Format dates
export var formatDate=(date)=>{
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("es-ES", options);
}

// puntos de miles
export var milesFormat=(x)=> {
    return x.toLocaleString('de-DE');
}