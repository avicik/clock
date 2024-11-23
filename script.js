const colElms = [];

function getTimeStr(date = new Date()) {
    return [date.getHours(), date.getMinutes(), date.getSeconds()]
        .map((item) => item.toString().padStart(2, "0"))
        .join("");
}

function createCol() {
    const createEl = (cls) => {
        const div = document.createElement("div");
        div.classList.add(cls);
        return div;
    };
    const [col, flip, flipNext, flipCurr, next, curr] = ["col", "flip", "next", "curr", "next", "curr"].map(
        (cls) => createEl(cls)
    );
    flip.append(flipNext, flipCurr);
    col.append(flip, next, curr);
    time.append(col);
    return {
        toggleActive: () => flip.classList.toggle("active"),
        getCurr: () => curr.dataset.t,
        setCurr: (t) => [flipCurr, curr].forEach((el) => (el.dataset.t = t)),
        setNext: (t) => [flipNext, next].forEach((el) => (el.dataset.t = t)),
    };
}

// 初始化时钟列
for (let i = 0; i < 6; i++) {
    colElms.push(createCol());
}

// 设置初始时间
const timeStr = getTimeStr();
colElms.forEach(({ setCurr }, i) => {
    setCurr(timeStr[i]);
});

let lastSec = new Date().getSeconds();
function updateTime() {
    let s = new Date().getSeconds();
    if (s === lastSec) {
        return;
    }
    lastSec = s;
    const currStr = getTimeStr();
    colElms.forEach(({ toggleActive, getCurr, setCurr, setNext }, i) => {
        var currTxt = getCurr();
        setNext(currStr[i]);
        if (currTxt !== currStr[i]) {
            toggleActive();
            setTimeout(() => {
                toggleActive();
                setCurr(currStr[i]);
            }, 500);
        }
    });
}

function run() {
    updateTime();
    requestAnimationFrame(run); // 使用requestAnimationFrame替代setTimeout以获得更好的性能
}

run();