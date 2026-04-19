document.addEventListener("DOMContentLoaded", function () {
    const generalBtn = document.getElementById("generalBtn");
    const focusedBtn = document.getElementById("focusedBtn");
    const banner = document.getElementById("ffBanner");

    if (!generalBtn || !focusedBtn || !banner) return;

    function setMode(mode) {
        document.body.classList.remove("ff-informed", "ff-entertained");
        generalBtn.classList.remove("active");
        focusedBtn.classList.remove("active");

        if (mode === "general") {
            document.body.classList.add("ff-informed");
            generalBtn.classList.add("active");
            banner.innerText = "Mode: General";
        } else if (mode === "focused") {
            document.body.classList.add("ff-entertained");
            focusedBtn.classList.add("active");
            banner.innerText = "Mode: Focused";
        } else {
            banner.innerText = "Mode: Default";
            mode = "default";
        }

        window.currentFeedMode = mode;
        console.log("[feedframe_mode.js] mode set to:", mode);
    }

    // Initialize without selecting either explicit mode.
    setMode("default");

    generalBtn.addEventListener("click", function () {
        setMode("general");
    });

    focusedBtn.addEventListener("click", function () {
        setMode("focused");
    });

    let pulseTimeout = null;

    function triggerPulse() {
        // 先移除，确保动画可以重新开始
        document.body.classList.remove("ff-pulsing");

        // 强制浏览器重算样式，帮助 animation 重新触发
        void document.body.offsetWidth;

        // 再加回来
        document.body.classList.add("ff-pulsing");

        console.log("pulse started:", document.body.className);

        // 避免上一次 timeout 残留
        if (pulseTimeout) {
            clearTimeout(pulseTimeout);
        }

        pulseTimeout = setTimeout(function () {
            document.body.classList.remove("ff-pulsing");
            console.log("pulse ended:", document.body.className);
        }, 5000);
    }

    // 暴露到 console，方便你手动测试
    window.triggerPulse = triggerPulse;

    // 每 10 秒 pulse 一次；正式实验再改回 60000
    setInterval(triggerPulse, 10000);
});
