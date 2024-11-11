const popupWindow = document.getElementById('popupWindow');

function popup(index) {
const data = (dataContents[index])
popupWindow.innerHTML = ""
popupWindow.innerHTML = `

<!-- Popup container -->
<div class="popup" id="popup">
  <!-- Popup content -->
  <div class="popup-content">
    <!-- Close button -->
    <span class="close">&times;</span>
    
    <!-- Project details -->
    <div class="project-details">
      <h2 id="project-title" class="text-center">${data.title}</h2>
      
      <!-- Video container -->
      <div class="video-container">
${data.demoVideo ? `<iframe title="vimeo-player" src="${data.demoVideo}"  frameborder="0"  id="project-video"  allowfullscreen></iframe>` : " <h2>NO MEDIA AVAILABLE</h2>"}
            </div>
      
      <!-- Video info -->
      <div class="video-info">
        <div class="video-actions">
        ${data.sourceCode ? `<a href="${data.sourceCode} class="code-btn">SOURCE CODE</a> `:""  }  
        ${data.article ? `<a href="${data.article} class="code-btn">READ MORE...</a> `:""  }  
        ${data.liveDemo ? `<a href="${data.liveDemo} class="code-btn">LIVE DEMO</a> `:""  }  
        </div>
        
        <!-- Tags -->
        <div class="tags-container">
            <span class="tags-title">TAGS : </span>
            <ul id="tags-list">
              <!-- Tags will be listed here -->
            </ul>
          </div>
          
          <!-- Description -->
          <div class="description-container">
            <h3 class="description-heading">Description : </h3>
            <p id="project-description">${data.description}</p>
          </div>
    </div>
  </div>
</div>

`
const popup = document.getElementById('popup');
 const close = document.querySelector('.close');
 const tagsList = document.getElementById('tags-list');
 
  popup.style.display = 'block';
  popup.classList.add('animated');
  popup.classList.add('fadeIn');
 
 // Hide popup on close click
 close.addEventListener('click', () => {
   popup.classList.remove('fadeIn');
   popup.classList.add('fadeOut');
   
   setTimeout(() => {
     popup.style.display = 'none';
     popup.classList.remove('animated');
     popup.classList.remove('fadeOut');
   }, 500);
 });
 
 // Hide popup on outside click
 window.addEventListener('click', (e) => {
   if (e.target === popup) {
     popup.classList.remove('fadeIn');
     popup.classList.add('fadeOut');
     
     setTimeout(() => {
       popup.style.display = 'none';
       popup.classList.remove('animated');
       popup.classList.remove('fadeOut');
     }, 500);
   }
   
 });
 
 // Add tags dynamically
 const projectTags = data.tags; // Replace with actual tags
 projectTags.forEach((tag) => {
   const tagElement = document.createElement('LI');
   tagElement.textContent = tag;
   tagsList.appendChild(tagElement);
 });
}