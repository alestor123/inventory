const popupWindow = document.getElementById('popupWindow')

function popup (index) {
  const data = (dataContents[index])
  popupWindow.innerHTML = ''
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
${data.demoVideo ? `<iframe title="vimeo-player" src="${data.demoVideo}"  frameborder="0"  id="project-video"  allowfullscreen></iframe>` : ''} 
${data.demoImage && data.demoImage.constructor === Array && data.demoImage.length >= 1
? `
  
${data.demoImage.length === 1
? `<img src="${data.demoImage}" alt="DEMO IMAGE" width="500" height="300">`
: `

 <div class="slideshow-container">
${
 data.demoImage.map((e, num) => {
return `<div class="mySlides fade">
                <div class="numbertext">${num + 1}/${data.demoImage.length}</div>
                <img src="${e}" width="500" height="300">
              </div>`
  }).join('')

}            
              <button class="prev" onclick="plusSlides(-1)">❮</button>
              <button class="next" onclick="plusSlides(1)">❯</button>
              
              </div>
              <br>
              
              <div style="text-align:center">


${
 data.demoImage.map((e, num) => {
return `<span class="dot" onclick="currentSlide(${num + 1})"></span>`
  }).join('')

}            
</div>
              </div>


`} 
  
  
  
  `
: ''}

${!data.demoVideo && !data.demoImage ? '<h2>Kitty says: Media not found</h2> <img src =\'https://media.tenor.com/J7GBdx1T2q4AAAAi/pusheen-detective.gif\' id=\'media-not-found\' >' : ''}

            </div>
      
      <!-- Video info -->
      <div class="video-info">
        <div class="video-actions">
    
        ${data.sourceCode ? ` <a href="${data.sourceCode}"  class="linkbutton" target='_blank'"> <i class="fa-brands fa-github-alt"> </i> SOURCE CODE </a>` : ''}  
        ${data.article ? `<a href="${data.article}" class="linkbutton" target='_blank'><i class="fa-solid fa-newspaper"></i>READ MORE...</a>` : ''}  
        ${data.liveDemo ? `<a href="${data.liveDemo}" class="linkbutton" target='_blank'><i class="fa-brands fa-chrome"></i> LIVE DEMO</a>` : ''}  
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

  const popup = document.getElementById('popup')
  const close = document.querySelector('.close')
  const tagsList = document.getElementById('tags-list')

  popup.style.display = 'block'
  popup.classList.add('animated')
  popup.classList.add('fadeIn')

  // Hide popup on close click
  close.addEventListener('click', () => {
    popup.classList.remove('fadeIn')
    popup.classList.add('fadeOut')

    setTimeout(() => {
      popup.style.display = 'none'
      popup.classList.remove('animated')
      popup.classList.remove('fadeOut')
    }, 500)
  })

  // Hide popup on outside click
  window.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('fadeIn')
      popup.classList.add('fadeOut')

      setTimeout(() => {
        popup.style.display = 'none'
        popup.classList.remove('animated')
        popup.classList.remove('fadeOut')
      }, 500)
    }
  })

  // Add tags dynamically
  const projectTags = data.tags // Replace with actual tags
  projectTags.forEach((tag) => {
    const tagElement = document.createElement('LI')
    tagElement.textContent = tag
    tagsList.appendChild(tagElement)
  })
  if (data.demoImage && data.demoImage.constructor === Array && data.demoImage.length >= 1) plusSlides(1)
}
let slideIndex = 1
showSlides(slideIndex)

function plusSlides (n) {
  showSlides(slideIndex += n)
}

function currentSlide (n) {
  showSlides(slideIndex = n)
}

function showSlides (n) {
  let i
  const slides = document.getElementsByClassName('mySlides')
  const dots = document.getElementsByClassName('dot')
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none'
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '')
  }
  if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = 'block'
  if (dots[slideIndex - 1]) dots[slideIndex - 1].className += ' active'
}
