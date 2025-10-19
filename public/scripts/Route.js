const searchParams = (new URLSearchParams(window.location.search))
const type = searchParams.get('type')
const maintitle = document.getElementById('main-title')
const maindesc = document.getElementById('main-description')

async function run () {
  const { items, contents, certificates, timeline, platformFetch, username } = (await (await fetch(fetchURL)).json())
  // code 404
  const isFound = keytype => (keytype.type === type)
  if (!items.some(isFound) && !platformFetch.includes(type)) window.location.replace('/404.html')
  const { title, description } = items.find(isFound)
  
  // Handle different content types
  let fileteredList;
  if (type == 'ossprojects') {
    fileteredList = await fetchGithubProjects(username)
  } else if (type == 'certificates') {
    fileteredList = certificates || []
  } else if (type == 'timeline') {
    fileteredList = timeline || []
  } else {
    fileteredList = contents.filter(contentType => contentType.type === type)
  }
  
  if (fileteredList.length === 0 && !platformFetch.includes(type)) window.location.replace('/empty.html')
  maintitle.innerHTML = title
  document.title = title
  maindesc.innerHTML = description
  displayDirs('contents', fileteredList)
  const tags = await generateTags(fileteredList)
  displayTags(tags)
// runPopup()
}

// async function fetchData() {

run()

function runAfterLoad () {
  // code after load
}
/*

<!-- Popup container -->
<div class="popup" id="popup">
  <!-- Popup content -->
  <div class="popup-content">
    <!-- Close button -->
    <span class="close">&times;</span>

    <!-- Project details -->
    <div class="project-details">
      <h2 id="project-title" class="text-center">Project Title</h2>

      <!-- Video container -->
      <div class="video-container">
        <iframe title="vimeo-player" src="https://player.vimeo.com/video/1027937493?h=93661452e5"  frameborder="0"  id="project-video"  allowfullscreen></iframe>      </div>

      <!-- Video info -->
      <div class="video-info">
        <div class="video-actions">
          <a class="demo-video-btn">DEMO VIDEO</a>
          <a class="code-btn">CODE</a>
          <a class="live-demo-btn">LIVE DEMO</a>
        </div>

        <!-- Tags -->
        <div class="tags-container">
            <span class="tags-title">TAGS:</span>
            <ul id="tags-list">
              <!-- Tags will be listed here -->
            </ul>
          </div>

          <!-- Description -->
          <div class="description-container">
            <h3 class="description-heading">Description</h3>
            <p id="project-description">Project description goes here.</p>
          </div>
    </div>
  </div>
</div>

*/
