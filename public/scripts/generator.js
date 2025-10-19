const searchInput = document.querySelector('.searchBarInput')
const list = document.querySelector('.list')
const selectionButtonsSection = document.querySelector('.selection')
const fetchURL = './config/user.json'
const fetchGITHUB = 'https://fetch-projects.vercel.app/'
let currentActiveClass = 'all'
const dataContents = []
let allItems = [] // Store all items for filtering
let searchTimeout = null // Debounce search
const main = async (username) => {
    // const {username} = (await (await fetch(fetchURL)).json());
    const data = (await (await fetch(`https://api.github.com/users/${username}`)).json());
    setProfile(data);
};

function setProfile({bio,blog,avatar_url,followers,public_repos,name,company}) {
const infoElement = document.querySelector('.info');
if (infoElement) {
    infoElement.innerHTML = `
<figure>
            <img alt="User Profile" src="${avatar_url}" class="avatar" />
        </figure>
        <div>
            <h2 id="name"><a href=${blog}><strong>${name}</strong></a></h2>
            <p>${bio}</p>
            <p>
                Followers: <strong>${followers}</strong>
                Repos: <strong>${public_repos}</strong>
                ${company ? "Work: "+company : "" }

            </p>

        </div>
        `;
}
}

function generateTags (fileteredList) {
  return [...new Set((fileteredList.map(e => e.tags)).flat())]
}
async function displayDirs (typeDir, filteredContent) {
  const { items, contents, username } = (await (await fetch(fetchURL)).json())
  main(username)
  searchInput.classList.remove('hide')
  if (typeDir === 'items') {
    items.forEach((dir, index) => {
      const liItem = document.createElement('li')
      liItem.classList.add('itm')
      dir.id = index
      liItem.innerHTML = generator(dir, 'main')
      list.append(liItem)
    }) // }
  } else if (typeDir === 'contents') {
    filteredContent.forEach((dir, index) => {
      dataContents.push(dir)
      const liItem = document.createElement('li')
      liItem.classList.add('itm')
      dir.id = index
      dir.tags.forEach((tag) => liItem.classList.add(tag))
      liItem.innerHTML = generator(dir, 'content')
      list.append(liItem)
    }) // }
  }
}

// Enhanced search with debouncing
searchInput.addEventListener('input', (e) => {
  const search = e.target.value
  
  // Clear previous timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  
  // Debounce search for better performance
  searchTimeout = setTimeout(() => {
    searchDisplay(search, currentActiveClass)
    updateResultsCount()
  }, 300)
})

// Clear search on ESC key
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    searchInput.value = ''
    searchDisplay('', currentActiveClass)
    updateResultsCount()
  }
})

// Enhanced search with multiple criteria
function searchDisplay (search, tag) {
  const items = document.querySelectorAll('.itm')
  const searchNormalize = search.toLowerCase().trim()
  
  items.forEach((item) => {
    const normalText = item.innerText.toLowerCase()
    const className = item.className.toLowerCase()
    
    // Multi-word search support
    const searchTerms = searchNormalize.split(' ').filter(term => term.length > 0)
    const matchesSearch = searchTerms.length === 0 || searchTerms.every(term => normalText.includes(term))
    
    // Tag filtering
    const matchesTag = tag === 'all' || className.includes(tag.toLowerCase())
    
    // Show/hide items with smooth transition
    if (matchesSearch && matchesTag) {
      item.classList.remove('remove')
      item.style.display = ''
    } else {
      item.classList.add('remove')
      item.style.display = 'none'
    }
  })
}

// Update results count
function updateResultsCount() {
  const items = document.querySelectorAll('.itm')
  const visibleItems = document.querySelectorAll('.itm:not(.remove)')
  
  // Create or update results counter
  let counter = document.querySelector('.results-counter')
  if (!counter) {
    counter = document.createElement('div')
    counter.className = 'results-counter'
    const searchBar = document.querySelector('.searchBar')
    if (searchBar) {
      searchBar.appendChild(counter)
    }
  }
  
  if (searchInput.value.trim() || currentActiveClass !== 'all') {
    counter.textContent = `Showing ${visibleItems.length} of ${items.length} items`
    counter.style.display = 'block'
  } else {
    counter.style.display = 'none'
  }
}
function generator (dir, type) {
//     ${tags ? tags.map(tag => tag).join(' ') : ""}
  // const tags = dir.tags ? dir.tags : false;
  if (type === 'main') {
    return `
<a href= "${dir.url ? dir.url : ('showcase.html?type=' + dir.type)} " target='_blank'>
    <div>
        <h3>
        <span class='${dir.icon}' ></span>
            ${dir.title}
        </h3>
        <p>${dir.description}</p>
           ${dir.tags ? `<p>Tags: ${dir.tags.map(tag => `#${tag}`).join(', ')}</p>` : ''} 
    </div>
</a>`
  } else if (type === 'content') {
    switch (dir.type) {
      case 'socials':
        return `
                    <a href= "${dir.url ? dir.url : ('showcase.html?type=' + dir.type)} " target='_blank'>
                        <div>
                            <h3>
                            <span class='${dir.icon}' ></span>
                                ${dir.title}
                            </h3>
                            <p>${dir.description.length >= 35 ? dir.description.substr(0, 35) + '...' : dir.description}</p>
                               ${dir.tags ? `<p>Tags: ${dir.tags.map(tag => `#${tag}`).join(', ')}</p>` : ''} 
                        </div>
                    </a>`;break
      case 'main':
        return `
                    <a href= "${dir.url ? dir.url : ('showcase.html?type=' + dir.type)} " target='_blank'>
                        <div>
                            <h3>
                            <span class='${dir.icon}' ></span>
                                ${dir.title}
                            </h3>
                            <p>${dir.description}</p>
                               ${dir.tags ? `<p>Tags: ${dir.tags.map(tag => `#${tag}`).join(', ')}</p>` : ''} 
                        </div>
                    </a>`;break
      case 'ossprojects':
        return `
                    <a href= "${dir.url ? dir.url : ('showcase.html?type=' + dir.type)} " target='_blank'>
                        <div>
                            <h3>
                            <span class='${dir.icon}' ></span>
                                ${dir.title}
                            </h3>
                            <p>${shortenDescription(dir.description)}</p>
                               ${dir.tags ? `<p>Tags: ${dir.tags.map(tag => `#${tag}`).join(', ')}</p>` : ''} 
                        </div>
                    </a>`;break
        // <a href= "${dir.url ? dir.url : ("showcase.html?type="+dir.type)} " target='_blank'>
      case 'softprojects':
      case 'hardprojects':
        return `
                                            
                                                <div>
                                                    <h3>
                                                    <span class='${dir.icon}' ></span>
                                                        ${dir.title}
                                                    </h3>
                                                    <p>${shortenDescription(dir.description)}</p>
                                                       ${dir.tags ? `<p>Tags: ${dir.tags.map(tag => `#${tag}`).join(', ')}</p>` : ''} 
                                                </div>
                                            </a>
                                            <!-- Trigger button -->
<button class="popup-trigger" onclick=popup(${dir.id}) >View Project</button>
`;break
      case 'certificates':
        return `
                    <a href="${dir.pdfUrl}" target='_blank'>
                        <div>
                            <h3>
                            <span class='${dir.icon}' ></span>
                                ${dir.title}
                            </h3>
                            <p>${dir.issuer} - ${dir.date}</p>
                            <p style="font-size: 0.85em; opacity: 0.8;">ID: ${dir.certificateId}</p>
                            ${dir.tags ? `<p>Tags: ${dir.tags.map(tag => `#${tag}`).join(', ')}</p>` : ''} 
                        </div>
                    </a>
                    <a href="${dir.verifyUrl}" class="popup-trigger" target='_blank' style="display: inline-block; text-decoration: none;">
                        <i class="fa-solid fa-certificate"></i> Verify Certificate
                    </a>
`;break
      case 'timeline':
        return `
                    <div style="pointer-events: none;">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <div style="font-size: 2em; font-weight: bold; color: var(--neon-cyan); min-width: 80px;">
                                ${dir.year}
                            </div>
                            <div style="flex: 1;">
                                <h3 style="margin: 0; display: flex; align-items: center; gap: 10px;">
                                    <span class='${dir.icon}'></span>
                                    <span>${dir.event}</span>
                                </h3>
                            </div>
                        </div>
                    </div>
`;break
    }
  }

  /*

*/
}
function displayTags (tags) {
  if (!selectionButtonsSection) return
  
  // Sort tags alphabetically
  const sortedTags = tags.sort((a, b) => a.localeCompare(b))
  
  sortedTags.forEach(tag => {
    const tagBtn = document.createElement('button')
    tagBtn.className = `btn ${tag}`
    tagBtn.textContent = tag.toUpperCase()
    tagBtn.setAttribute('data-tag', tag)
    tagBtn.onclick = () => filterSelection(tag)
    selectionButtonsSection.appendChild(tagBtn)
  })
}

function filterSelection (className) {
  if (!selectionButtonsSection) return
  
  // Update active state
  const selectionButtons = document.querySelectorAll('.btn')
  selectionButtons.forEach(btn => btn.classList.remove('active'))
  
  const selectedButton = document.querySelector(`.btn[data-tag="${className}"], .btn.${className}`)
  if (selectedButton) {
    selectedButton.classList.add('active')
  }
  
  currentActiveClass = className
  
  // Apply filter with current search term
  const currentSearch = searchInput ? searchInput.value : ''
  searchDisplay(currentSearch, currentActiveClass)
  updateResultsCount()
  
  // Smooth scroll to results
  const firstVisibleItem = document.querySelector('.itm:not(.remove)')
  if (firstVisibleItem) {
    firstVisibleItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
}

// Clear all filters
function clearFilters() {
  if (searchInput) {
    searchInput.value = ''
  }
  filterSelection('all')
  updateResultsCount()
}

// Export filter function for global access
window.filterSelection = filterSelection
window.clearFilters = clearFilters

async function fetchGithubProjects (username) {
  const { data, tags } = (await (await fetch(fetchGITHUB + 'api/v1/allprojects?username=' + username)).json())
  const formattedData = data.map(project => {
    return {
      title: project.name,
      description: project.description,
      url: project.html_url,
      icon: project.icon,
      url: project.html_url,
      stars: project.stargazers_count,
      type: 'ossprojects',
      version: project.package.version,
      demoURL: project.homepage ? project.homepage : undefined,
      tags: project.topics.filter(value => tags.includes(value))
    }
  })
  return formattedData
}

function shortenDescription (description) {
  if (!description) return ''
  return description.length >= 35 ? description.substring(0, 35) + '...' : description
}

// Initialize search and filter system
function initializeSearchAndFilter() {
  // Add clear button to search
  if (searchInput && !document.querySelector('.search-clear')) {
    const clearBtn = document.createElement('button')
    clearBtn.className = 'search-clear'
    clearBtn.innerHTML = '<i class="fa-solid fa-times"></i>'
    clearBtn.title = 'Clear search'
    clearBtn.onclick = () => {
      searchInput.value = ''
      searchDisplay('', currentActiveClass)
      updateResultsCount()
      searchInput.focus()
    }
    
    const searchBar = document.querySelector('.searchBar')
    if (searchBar) {
      searchBar.style.position = 'relative'
      searchBar.appendChild(clearBtn)
    }
    
    // Show/hide clear button
    searchInput.addEventListener('input', () => {
      clearBtn.style.display = searchInput.value ? 'block' : 'none'
    })
  }
}

// Call initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSearchAndFilter)
} else {
  initializeSearchAndFilter()
}
