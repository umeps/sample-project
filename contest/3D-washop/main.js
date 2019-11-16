var time=new Date().getTime();
window.onload = function(){  // ローディング画面をフェードアウトさせる
    $(function() {
        $("#loading").fadeOut();
    });
}

$(function() {   //ロード中はコンテンツの高さをページの高さに合わせる
    var h = $(window).height();
    $('#container').css('display','none');
    $('#loader').height(h).css('display','block');
});

$(window).load(function () {  //全ての読み込みが完了したら実行する
    $('#loader').delay(600).fadeOut(300);
    $('#container').css('display', 'block');

    });

    