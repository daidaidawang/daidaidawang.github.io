document.addEventListener('click', (e) => {
  const cats = ['😺','😸','😹','😻','😼','😽'];
  const cat = document.createElement('div');
  cat.className = 'cat-emoji';
  cat.textContent = cats[Math.floor(Math.random() * cats.length)];
  
  // 精准视口定位（无视滚动条）
  cat.style.left = `${e.clientX}px`;
  cat.style.top = `${e.clientY}px`;
  
  // 随机大小
  cat.style.fontSize = `${20 + Math.random() * 15}px`;
  
  document.body.appendChild(cat);
  
  // 动画结束后移除
  setTimeout(() => {
    cat.remove();
  }, 1000);
});