// source/js/cat-click.js
document.addEventListener('click', function(e) {
  const cats = ['😺','😸','😹','😻','😼','😽'];
  const cat = document.createElement('div');
  
  // 必须匹配CSS中的类名
  cat.className = 'cat-emoji'; 
  cat.textContent = cats[Math.floor(Math.random() * cats.length)];
  
  // 精准定位 (考虑滚动偏移)
  cat.style.left = `${e.pageX - 15}px`;
  cat.style.top = `${e.pageY - 15}px`;
  
  // 可选：随机大小
  cat.style.fontSize = `${20 + Math.random() * 15}px`;
  
  document.body.appendChild(cat);
  
  // 自动移除 (时间需与CSS动画匹配)
  setTimeout(() => {
    cat.remove();
  }, 1000);
});