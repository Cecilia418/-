window.addEventListener('DOMContentLoaded', function() {
  const bannerImg = document.getElementById('bannerImg');
  const flashMask = document.getElementById('flashMask');
  
  // 1. 预加载目标图片
  const newImg = new Image();
  newImg.src = 'library-quiz.jpg';
  
  // 2. 检查缓存状态
  if (localStorage.getItem('flash_done')) {
    bannerImg.src = newImg.src;
    return;
  }

  // 3. 登录状态验证
  const isLoginSuccess = sessionStorage.getItem('libraryImgChanged') === 'true' || 
                        localStorage.getItem('libraryImgChanged') === 'true';
  if (!isLoginSuccess) return;

  // 4. 图片加载完成后的闪白逻辑
  const triggerFlash = () => {
    flashMask.style.display = 'block';
    
    // 使用requestAnimationFrame确保渲染
    requestAnimationFrame(() => {
      // 5. 精确控制闪白时间 (50ms)
      setTimeout(() => {
        bannerImg.src = newImg.src;
        flashMask.style.display = 'none';
        localStorage.setItem('flash_done', '1');
      }, 50);
    });
  };

  // 6. 确保原图加载完成
  if (bannerImg.complete) {
    triggerFlash();
  } else {
    bannerImg.onload = triggerFlash;
  }
});
