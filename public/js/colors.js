
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
      $(div).addClass("hidden")
      $(element).append(div)
      $(div).fadeIn(2000)
      $(div).removeClass("hidden")
      $(div).addClass("child")
    })
  })
}

function fade(i, arr, control) {
  for (let idx = 0; idx < arr.length; idx++) {
    arr[idx] = Number(arr[idx])
  }

  if (control === "auto") {
    arr[i] = (arr[i] * 2) % 255;
  } else {
    let mult = (Math.pow(arr[i], 2)) % 255;
    let divi = (Math.floor(Math.sqrt(arr[i])));
    arr[i] = [mult, divi][Math.floor(Math.random() * 2)]
  }

  return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`
}

function transformElements() {
  console.log($('div').css('border-radius'))
  let borderRadius = ($('div').css('border-radius') === '0px') ? '100%' : '0px';
  $('div').css('border-radius', borderRadius)
}

let colorDivide;

function loadColors() {
  colorDivide = setInterval(function () {
    if ($('div').length > 600) {
      clearInterval(colorDivide)
    } else {
      divideColors("auto", $('.child'));
    }
    console.log($('div').length)
  }, 2000)
}

$(window).on('load', loadColors)

$('div').click((e) => {
  let fx = $(e.target).css("flex-direction")
  if (fx === "row") {
    divideColors("click", e.target)
  } else {
    transformElements()
  }
})

$('.child').mouseover((e) => {
  $(e.target).fadeTo("slow", .5)
})

$('.child').mouseout((e) => {
  $(e.target).fadeTo("slow", 1.0)
})