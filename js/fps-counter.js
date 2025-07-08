class FPSCounter {
  constructor() {
    this.container = null;
    this.fpsValue = null;
    this.fpsText = null;
    this.frameTimes = [];
    this.maxFrames = 30; // 计算最近30帧的平均FPS
    this.lastTimestamp = performance.now();
    this.init();
  }

  init() {
    this.createUI();
    this.startTracking();
  }

  createUI() {
  this.container = document.createElement('div');
  this.container.id = 'hexo-fps-counter';
  this.container.style.cssText = `
  position: fixed;
  bottom: 15px;
  left: 15px;
  background: transparent;   /* 或半透明，根据你需求 */
  color: #fff;
  padding: 6px 10px;
  border-radius: 4px;
  font-family: 'Press Start 2P', monospace;
  font-size: 10px;
  z-index: 999999;           /* 提高层级，避免被顶栏覆盖 */
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  line-height: 1.6;
`;


  this.fpsValue = document.createElement('div');
  this.fpsValue.style.fontWeight = 'bold';
  this.fpsValue.style.fontSize = '14px';
  this.fpsValue.textContent = 'FPS: --';

  this.fpsText = document.createElement('div');
  this.fpsText.style.fontSize = '10px';
  this.fpsText.textContent = '正在初始化...';

  this.container.appendChild(this.fpsValue);
  this.container.appendChild(this.fpsText);
  document.body.appendChild(this.container);
}


  startTracking() {
    const updateFPS = (timestamp) => {
      const deltaTime = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;
      
      this.frameTimes.push(deltaTime);
      if (this.frameTimes.length > this.maxFrames) {
        this.frameTimes.shift();
      }

      const avgFrameTime = this.frameTimes.reduce((a, b) => a + b) / this.frameTimes.length;
      const fps = Math.round(1000 / avgFrameTime);
      
      this.updateDisplay(fps);
      requestAnimationFrame(updateFPS);
    };
    
    requestAnimationFrame(updateFPS);
  }

  updateDisplay(fps) {
    this.fpsValue.textContent = `FPS: ${fps}`;
    this.fpsValue.style.color = this.getColorForFPS(fps);
    this.fpsText.textContent = this.getDescriptionForFPS(fps);
  }

  getColorForFPS(fps) {
    if (fps >= 55) return '#2ecc71';
    if (fps >= 30) return '#f39c12';
    return '#e74c3c';
  }

  getDescriptionForFPS(fps) {
    if (fps >= 55) return '极流畅 😎 |  6G 纵享丝滑✨';
    if (fps >= 45) return '流畅 🙂 |  5G 嗖嗖嗖🚀';
    if (fps >= 30) return '良好 😌 | 4G 可以的可以 👍';
    if (fps >= 20) return '轻微卡顿 😕 | 3G 龟速 🐢';
    return '严重卡顿 😖 | 原地爆炸 💥';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 判断是否移动端，兼容没有 btf 的情况
  const isMobile = window.btf && typeof window.btf.isMobile === 'function'
    ? window.btf.isMobile()
    : /Mobi|Android|iPhone/i.test(navigator.userAgent);

  if (isMobile) return;
  new FPSCounter();
});
