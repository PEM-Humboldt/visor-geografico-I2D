import $ from "jquery";
import './tutorial.scss';

// show tutorial

localStorage.getItem("tutorial")!=='no'
&&$('#tutorialstep1').modal('show')


// close tutorial
var closeTutorial =()=>{
    $('#tutorialstep1').modal('hide');
    $('#tutorialstep2').hide();
    $('#tutorialstep3').hide();
    $('#tutorialstep4').hide();
    localStorage.setItem("tutorial", "no");
}

export var tutorialChangeStep3=()=>{
    if($('#tutorialstep3').hasClass('show')){
        $('#tutorialstep3').hide();
        $('#tutorialstep4').removeClass('hide').addClass('show');
    }
}

export var closeTutorialOnStep4=()=>{
    if($('#tutorialstep4').hasClass('show')){
        closeTutorial()
    }
}

$('.closeTutorial').on( "click", function() {
    closeTutorial();
})

$('#goStep2').on( "click", function() {
    $('#tutorialstep1').modal('hide');
    $('#tutorialstep2').removeClass('hide').addClass('show');
})

$('#goStep3').on( "click", function() {
    $('#tutorialstep2').hide();
    $('#tutorialstep3').removeClass('hide').addClass('show');
})

$('#goStep4').on( "click", function() {
    $('#tutorialstep3').hide();
    $('#tutorialstep4').removeClass('hide').addClass('show');
})