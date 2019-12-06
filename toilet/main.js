$(function() {
    // 移動する要素の親要素(スワイプ後の位置を確認するのに使用)
    var swWrap = $('#wrap');
    // 移動する要素
    var sw = swWrap.children('.toilet-box');
    var isTouch = ('ontouchstart' in window);
    // 初期位置
    var basePoint;
    // 移動する要素にイベントが発生した時
    sw.bind({
        // タッチ開始
        'touchstart mousedown': function(e) {
            e.preventDefault();
            // 画面の左端からの座標
            this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
            // basePointとthis.leftに現在のleftの値(0)を追加
            basePoint = this.left = parseFloat($(this).css('left')); 
            this.touched = true;
        },
        // タッチ中
        'touchmove mousemove': function(e) {
            if(!this.touched) {
                return;
            }
            e.preventDefault();
            // 移動要素のleftに入れる値
            this.left = parseFloat($(this).css('left')) - (this.pageX - (isTouch ? event.changedTouches[0].pageX : e.pageX) );
            $(this).css({
                left: this.left
            });
            // 画面の左端からの座標
            this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
        },
        // タッチ終了
        'touchend mouseup': function(e) {
            if(!this.touched) {
                return;
            }
            this.touched = false;
            // 移動要素が親要素の範囲より右にはみ出しているとき
            if(this.left > 0) {
                // 移動要素と親要素の左端を合わせる
                $(this).animate({
                    left: 0
                }, 200);
            // 移動要素が親要素の範囲より左にはみ出しているとき
            } else if(this.left < swWrap.width() -  sw.width()) {
                // 移動要素と親要素の右端を合わせる
                $(this).animate({
                    left: swWrap.width() -  sw.width()
                }, 200);
            } else {
            }
        }
    });
});