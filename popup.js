const form = document.getElementById('form')

form.addEventListener('submit', e => {
  e.preventDefault()
  const data = new FormData(form)

  const width = Number(data.get('input'))

  if (isNaN(width)) {
    return
  }

  chrome.storage.sync.set({ width })
  console.log(`Set width to ${width}`)
})
