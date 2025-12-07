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
      
      <!-- Media container with 16:9 aspect ratio -->
      <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000;">
        ${data.demoVideo 
          ? `<iframe 
                title="video-player" 
                src="${data.demoVideo.replace('watch?v=', 'embed/')}" 
                frameborder="0" 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                allowfullscreen>
             </iframe>` 
          : data.demoImage 
            ? Array.isArray(data.demoImage) && data.demoImage.length > 0
              ? `
                <div class="slideshow-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                  ${data.demoImage.map((img, index) => `
                    <div class="mySlides fade" style="position: relative; width: 100%; height: 100%;">
                      <div class="numbertext" style="position: absolute; top: 10px; left: 10px; color: white; background: rgba(0,0,0,0.7); padding: 5px 10px; border-radius: 3px; font-size: 12px;">
                        ${index + 1}/${data.demoImage.length}
                      </div>
                      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: #000;">
                        <img 
                          src="${img}" 
                          alt="${data.title} - Image ${index + 1}" 
                          style="max-width: 100%; max-height: 100%; object-fit: contain;"
                          loading="lazy"
                        >
                      </div>
                    </div>
                  `).join('')}
                  <button class="prev" onclick="plusSlides(-1)" style="position: absolute; top: 50%; left: 10px; transform: translateY(-50%); background: rgba(0,0,0,0.5); color: white; border: none; cursor: pointer; padding: 15px; border-radius: 50%;">❮</button>
                  <button class="next" onclick="plusSlides(1)" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: rgba(0,0,0,0.5); color: white; border: none; cursor: pointer; padding: 15px; border-radius: 50%;">❯</button>
                </div>
                <div style="text-align: center; position: absolute; bottom: 15px; width: 100%;">
                  ${data.demoImage.map((_, index) => 
                    `<span class="dot" onclick="currentSlide(${index + 1})" style="cursor: pointer; height: 12px; width: 12px; margin: 0 4px; background-color: #bbb; border-radius: 50%; display: inline-block; transition: background-color 0.3s ease;"></span>`
                  ).join('')}
                </div>
              `
              : `
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: #000;">
                  <img 
                    src="${data.demoImage}" 
                    alt="${data.title}" 
                    style="max-width: 100%; max-height: 100%; object-fit: contain;"
                    loading="lazy"
                  >
                </div>
              `
            : ''
        }

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
