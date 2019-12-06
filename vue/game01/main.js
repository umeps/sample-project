new Vue({
    el: '#app',
    data: {
        states: [], // 初期値はmountedの中で設定
        playerId: 1, // ○ のプレイヤーから開始,
        winnerText: ''
    },
    methods: {
        init: function() {

            this.states = [
                [-1, -1, -1],
                [-1, -1, -1],
                [-1, -1, -1]
            ];

        },
        onSelect: function(rowsIndex, colsIndex) {

            this.winnerText = '';

            if(this.states[rowsIndex][colsIndex] != -1) {

                alert('そのマスは、すでに選択されています！');

            } else {

                var states = JSON.parse(JSON.stringify(this.states))
                states[rowsIndex][colsIndex] = this.playerId;
                this.states = states;
                this.playerId = (this.playerId == 1) ? 2 : 1;
                var winnerId = this.getWinnerId();

                if(winnerId != -1) {

                    this.init();
                    playerIds = {
                        1: '○',
                        2: '×'
                    };
                    this.winnerText = playerIds[winnerId] +' さんの勝ちです。おめでとうございます！';

                } else if(this.isDraw()) {

                    this.init();
                    alert('引き分けです！');

                }

            }

        },
        getWinnerId: function() {

            for(var i = 0; i < 3 ; i++){

                // 横の列
                var row = this.states[i];
                if(this.isStatesFilled(row)) { return row[0];}

                // 縦の列
                var col = [
                    this.states[0][i],
                    this.states[1][i],
                    this.states[2][i]
                ];
                if(this.isStatesFilled(col)) { return this.states[0][i]; }

            }

            // ななめ
            var skew1 = [
                this.states[0][0],
                this.states[1][1],
                this.states[2][2]
            ];
            if(this.isStatesFilled(skew1)) { return this.states[0][0]; }

            var skew2 = [
                this.states[0][2],
                this.states[1][1],
                this.states[2][0]
            ];
            if(this.isStatesFilled(skew2)) { return this.states[0][2]; }

            return -1;

        },
        isStatesFilled: function(states) {

            return(
                states[0] != -1 &&
                states[0] == states[1] &&
                states[1] == states[2]
            );

        },
        isDraw: function() {

            for(var i in this.states) {

                var row = this.states[i];

                for(var j in row) {

                    var state = row[j];

                    if(state == -1) {

                        return false;

                    }

                }

            }

            return true;

        }
    },
    mounted: function() {

        this.init();

    }
})
