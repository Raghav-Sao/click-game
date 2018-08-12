const MAX_TIME = 120
let activeElement = null,
  level = 3,
  score = 0,
  start = null,
  timer = MAX_TIME

dGBI = id => {
  return document.getElementById(id)
}

dGBI('max-score').innerHTML = localStorage.getItem('score') | 0

generateDiv = (containerSize, boxSize) => {
  let container = document.createElement('DIV')
  container.style.width = containerSize + 'px'
  container.style.height = containerSize + 'px'
  container.id = 'box-container'
  for (var row = 0; row < containerSize / boxSize; row++) {
    for (var i = 0; i < containerSize / boxSize; i++) {
      let tempDiv = document.createElement('DIV')
      tempDiv.style.width = boxSize - 2 + 'px'
      tempDiv.style.height = boxSize - 2 + 'px'
      tempDiv.style.display = 'inline-block'
      tempDiv.style.border = '1px solid #ccc'
      tempDiv.id = row * containerSize / boxSize + i
      tempDiv.class = 'clickable'
      container.appendChild(tempDiv)
    }
  }
  return container
}

generateBackgroundOnDiv = (containerSize, boxSize) => {
  if (timer-- === 0) {
    clearInterval(start)
    if (confirm('GAME OVER!!!')) {
      if (score > localStorage.getItem('score')) localStorage.setItem('score', score)
      score = 0
      timer = MAX_TIME
      activeElement = null
      start = setInterval(generateBackgroundOnDiv, 1000, containerSize, boxSize)
    }
    dGBI('select-level').disabled = false
    dGBI('start').disabled = false
    return
  }
  dGBI('timer').innerHTML = timer
  childNumber = Math.floor(Math.random() * (containerSize / boxSize * containerSize / boxSize))
  dGBI(childNumber).style.background = 'green'
  activeElement = childNumber
  setTimeout(
    childNumber => {
      const ele = dGBI(childNumber)
      ele.style.background = 'white'
      ele.setAttribute('clicked', false)
    },
    900,
    childNumber
  )
}

dGBI('clickable-container').addEventListener('click', event => {
  if (event.target.class === 'clickable' && !dGBI(childNumber).getAttribute('clicked')) {
    if (activeElement == event.target.id) {
      dGBI(childNumber).setAttribute('clicked', true)
      if (++score > localStorage.getItem('score')) {
        localStorage.setItem('score', score)
        dGBI('max-score').innerHTML = score
      }
    } else {
      score--
    }
    dGBI('score').innerHTML = score
  }
})

dGBI('start').addEventListener('click', () => {
  timer = MAX_TIME
  const containerSize = 150 * level,
    boxSize = 150
  if (dGBI('box-container')) dGBI('clickable-container').removeChild(dGBI('box-container'))
  const generatedEle = generateDiv(containerSize, boxSize)
  dGBI('clickable-container').appendChild(generatedEle)
  clearInterval(start)
  start = setInterval(generateBackgroundOnDiv, 1000, containerSize, boxSize)
  dGBI('select-level').disabled = true
  dGBI('start').disabled = true
})

dGBI('select-level').addEventListener('change', event => {
  level = event.target.value
})
