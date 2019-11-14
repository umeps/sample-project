$(document).on('click', function(e) {
    if(!$(e.target).closest('#pop_up').length && !$(e.target).closest('#button').length){
        $('#pop_up').fadeOut();
    }else if($(e.target).closest('#button').length){
        if($('#pop_up').is(':hidden')){
            $('#pop_up').fadeIn();
        }else{
            $('#pop_up').fadeOut();
        }
    }
});


$(document).ready(function(){
    $("a").click(function(){
      $("#popup").fadeToggle( "slow" );
      
    });
      
  });