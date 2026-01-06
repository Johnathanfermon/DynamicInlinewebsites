// bubble.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".bubbles");
  const bubbleCount = 60; // Increased number of bubbles for better effect
  
  // Clear existing bubbles
  container.innerHTML = '';
  
  // Create bubbles
  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    
    // Size categories
    const sizeType = Math.random();
    if (sizeType < 0.3) {
      bubble.classList.add("small");
    } else if (sizeType < 0.7) {
      bubble.classList.add("medium");
    } else {
      bubble.classList.add("large");
    }
    
    // Random starting position
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    bubble.style.left = `${startX}%`;
    bubble.style.top = `${startY}%`;
    
    // Random animation variations
    const duration = 20 + Math.random() * 15; // 20-35 seconds
    const delay = Math.random() * 30; // 0-30 seconds delay
    const xMult = Math.random() > 0.5 ? 1 : -1;
    const yMult = Math.random() > 0.5 ? 1 : -1;
    
    // Custom CSS properties for animation
    bubble.style.setProperty('--x-mult', xMult);
    bubble.style.setProperty('--y-mult', yMult);
    bubble.style.animationDuration = `${duration}s, ${3 + Math.random() * 4}s, ${2 + Math.random() * 3}s`;
    bubble.style.animationDelay = `-${delay}s, -${delay/2}s, -${delay/3}s`;
    
    // Random blur and opacity for depth effect
    const blur = 0.5 + Math.random() * 2;
    bubble.style.filter = `blur(${blur}px)`;
    
    // Random color variations (blue theme with some purples)
    const hue = 210 + Math.random() * 40 - 20; // 190-230 range
    const saturation = 60 + Math.random() * 30; // 60-90%
    const lightness = 50 + Math.random() * 20; // 50-70%
    
    bubble.style.background = `radial-gradient(
      circle at ${20 + Math.random() * 60}% ${20 + Math.random() * 60}%,
      hsla(${hue}, ${saturation}%, ${lightness}%, ${0.6 + Math.random() * 0.3}),
      hsla(${hue}, ${saturation}%, ${lightness - 20}%, ${0.1 + Math.random() * 0.2})
    )`;
    
    container.appendChild(bubble);
  }
  
  // Make bubbles interactive on desktop
  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      const bubbles = document.querySelectorAll(".bubble");
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      bubbles.forEach((bubble, index) => {
        const rect = bubble.getBoundingClientRect();
        const bubbleX = rect.left + rect.width / 2;
        const bubbleY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(mouseX - bubbleX, 2) + 
          Math.pow(mouseY - bubbleY, 2)
        );
        
        // If mouse is close to bubble, make it react
        if (distance < 200) {
          const strength = 1 - (distance / 200);
          const offsetX = (mouseX - bubbleX) * 0.05 * strength;
          const offsetY = (mouseY - bubbleY) * 0.05 * strength;
          
          bubble.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + strength * 0.3})`;
        }
      });
    });
    
    // Reset bubble positions when mouse leaves
    document.addEventListener("mouseleave", () => {
      const bubbles = document.querySelectorAll(".bubble");
      bubbles.forEach(bubble => {
        bubble.style.transform = '';
      });
    });
  }
  
  // Add some bubbles that move faster for variety
  setTimeout(() => {
    const fastBubbles = document.querySelectorAll('.bubble:nth-child(3n)');
    fastBubbles.forEach(bubble => {
      bubble.style.animationDuration = '15s, 2s, 1s';
    });
  }, 100);
});