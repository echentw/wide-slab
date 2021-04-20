let observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (!mutation.addedNodes) return

    for (let i = 0; i < mutation.addedNodes.length; i++) {
      // do things to your newly added nodes here
      let node = mutation.addedNodes[i]
      if (node.className === 'post-layout-toc') {
        console.log('detected node ' + node.className)
        chrome.storage.sync.get(['width'], ({width}) => {
          setContentWidth(width)
        })
      }
    }
  })
})

observer.observe(document.body, {
    childList: true
  , subtree: true
  , attributes: false
  , characterData: false
})

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
    if (key === 'width') {
      console.log('changed from ' + oldValue + ' to ' + newValue)
      setContentWidth(newValue)
    }
  }
})

function setContentWidth(width) {
  if (!width) return

  console.log('setting width to ' + width)

  const node = document.getElementsByClassName('post-layout-container')[0]

  console.log(node)

  node.style.gridTemplateColumns = [
    'minmax(32px,1fr)',
    'minmax(0,0)',
    'minmax(200px,252px)',
    'min-content',
    `minmax(${width}px,${width}px)`,
    '290px',
    'minmax(0,0)',
    'minmax(32px,1fr)',
  ].join(' ')
}
