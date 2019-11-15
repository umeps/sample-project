
$(document).ready(function(){
    $(".access").click(function(){
        for(let i=1;i<=2; i++){
            if (i != 1){
            $('#' + i).hide();
            }
        }
      $("#1").fadeToggle( "slow" );
    });
  });


  $(document).ready(function(){
    $(".maill").click(function(){
        for(let i=1;i<=2; i++){
            if (i != 2){
            $('#' + i).hide();
            }
        }
      $("#2").fadeToggle( "slow" );
    });

  });



  $(document).ready(function(){
    $(".modal10").click(function(){
        
      $("#2").fadeToggle( "slow" );
    });
      
  });