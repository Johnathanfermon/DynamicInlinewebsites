// app.js
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const toggle = document.querySelector(".sidebar-toggle");
  
  // Toggle sidebar
  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    
    // Update toggle button text
    toggle.textContent = sidebar.classList.contains("collapsed") ? "☰" : "✕";
  });
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", (event) => {
    if (window.innerWidth <= 900 && 
        !sidebar.contains(event.target) && 
        !toggle.contains(event.target) && 
        !sidebar.classList.contains("collapsed")) {
      sidebar.classList.add("collapsed");
      toggle.textContent = "☰";
    }
  });
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 900) {
        sidebar.classList.remove("collapsed");
        toggle.textContent = "☰";
      }
    }, 250);
  });
  
  // Initialize active page
  document.querySelector('.sidebar li.active').click();
});