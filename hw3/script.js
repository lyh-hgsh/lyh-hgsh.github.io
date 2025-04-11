// 定義變數
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = [0, canvas.width, canvas.width,canvas.width], 
    y = [0, 20, 100,200], 
    dx = [5, 5, 5,5], 
    dy = [5, 5, 5,5], 
    r = [30, 30, 30,30], 
    color = ["#0095DD", "red", "green","pink"];

let N = 4;

// 畫圓形
function drawBall(x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2); // arc(圓心x, 圓心y, 半徑, 起始角, 結束角)
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

// 更新畫布
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 移動位置
    for (let i = 0; i < N; ++i) {
        x[i] = x[i] + dx[i];
        y[i] = y[i] + dy[i];
    }

    // ✅ 修正：把 if 放進 for 裡（原本 y[i] 那段錯誤地在 for 之外）
    for (let i = 0; i < N; ++i) {
        if (x[i] < 0 || x[i] > canvas.width) {
            dx[i] = -dx[i];
        }
        if (y[i] < 0 || y[i] > canvas.height) {
            dy[i] = -dy[i];
        }
    }

    // 球與球之間碰撞
    for (let i = 0; i < N; ++i) {
        for (let j = i + 1; j < N; ++j) {
            if ((x[i] - x[j]) * (x[i] - x[j]) + (y[i] - y[j]) * (y[i] - y[j]) < (r[i] + r[j]) * (r[i] + r[j])) {
                [dx[i], dx[j]] = [dx[j], dx[i]];
                [dy[i], dy[j]] = [dy[j], dy[i]];
            }
        }
    }

    // 畫球
    for (let i = 0; i < N; ++i) {
        drawBall(x[i], y[i], r[i], color[i]);
    }

    requestAnimationFrame(draw);
}

draw();