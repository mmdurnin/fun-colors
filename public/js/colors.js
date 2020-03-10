function divideColors(control, elements) {
  $(elements).each(function(i, element) {
    let color = $(this).css("background-color")
    let string = (color[3] === "a") ? color.slice(5, color.length - 1) : color.slice(4, color.length - 1)
    let array = string.split(', ')
    
    let ul = $(document.createElement('div')).css('background-color', `${fade(0, array, control)}`)
    let ur = $(document.createElement('div')).css('background-color', `${fade(1, array, control)}`)
    let ll = $(document.createElement('div')).css('background-color', `${fade(2, array, control)}`)
    let newDivs = [ul, ur, ll]

    let flexDirection = ['column', 'row'][Math.floor(Math.random() * 2)]
    console.log(flexDirection)
    newDivs.forEach((div) => {
      $(div).css('flex-direction', flexDirection)
      div.className = "child"
      $(element).append(div)
    })
  })
}

function fade(i, arr, control) {
  for (let idx = 0; idx < arr.length; idx++) {
    arr[idx] = Number(arr[idx])
  }

  if (control === "auto") {
    arr[i] = (arr[i] + 8) % 255;
  } else {
    let mult = (Math.pow(arr[i], 2)) % 255;
    let divi = (Math.floor(Math.sqrt(arr[i])));
    arr[i] = [mult, divi][Math.floor(Math.random() * 2)]
  }

  return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`
}


$(window).on('load', () => {
  const colorDivide = setInterval(function() {
    if ($('div').length > 300) {
      clearInterval(colorDivide)
    } else {
      divideColors("auto", $('.child'));
    }
    console.log($('div').length)
  }, 1000)
})

$('div').click((e) => {
  divideColors("click", e.target)
})

$('div').mouseover((e) => {
  $(e.target).animate({right: '250px'}, "slow")
})

$('div').mouseout((e) => {
  $(e.target).animate({left: '250px'})
})