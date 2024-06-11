// 將背景設定為黑色
setBackdrop("#000000");
// 用 "head.gif" 創造一個角色
var head = createSprite( "head.gif" );
var food = createSprite( "food.gif" );
var bodies = [];
var clock = 0;
var score = 0;

forever(function(){
    // 在這裡的程式碼會不斷執行
    if(clock % 8 == 0){
        var lastBody = bodies.pop();
        if(lastBody){
            lastBody.x = head.x;
            lastBody.y = head.y;
            bodies.unshift(lastBody);
        }
        head.stepForward(16);
        if( head.touched(bodies) || head.x<0 || head.x>640 || head.y<0 || head.y>480 ){
            print("GAME OVER", 120, 200, "white", 64);
            stop();
        }
        if( head.touched(food) ){
            score = score +1;
            food.x = Math.random()*640;
            food.y = Math.random()*480;
            var body = createSprite("body.gif");
            body.x = head.x;
            body.y = head.y;
            bodies.push( body );
        }
    }
    clock = clock +1;
    print(score, 20, 20,"white");
});

// 當按下鍵盤的「右方向鍵」時
when("keydown", "right", function(){
	head.direction = 90;
});
when("keydown", "up", function(){
	head.direction = 0;
});
when("keydown", "down", function(){
	head.direction = 180;
});
when("keydown", "left", function(){
	head.direction = 270;
});