import $ from "jquery";

export const resumeData =(title_mupio)=>{
    try{
        console.log('entra')
        var createOptionsVar=(title_mupio)=>{
            let existingSidebar = $('#resumeData');
            let title = document.createElement('h5');
            title.id = "titleResume";
            title.innerHTML = "Información " + title_mupio;
            existingSidebar.append(title)
        }
   
        createOptionsVar(title_mupio);
        

    }catch{
        console.log('no fue posible cargar la información')
    }
    
}