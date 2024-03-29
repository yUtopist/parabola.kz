const w = window,
  d = document
const navContainer = d.querySelector("#navigation")
const navLinks = d.querySelector("#navigation__links")
const navLinksArray = Array.from(navLinks.querySelectorAll(".navigation__link"))
const heroLogo = d.querySelector("#hero__logo")
const heroParagraph = d.querySelector("#hero__descro")
const teamCards = Array.from(d.querySelector("#team__forground").children)
const teamBackground = Array.from(d.querySelector("#team__background").children)
const sections = Array.from(d.querySelector("#main").children)
const heroVideo = d.querySelector("#hero__video")
const serviceVideo = d.querySelector("#service__video")
const topSectionVideosArray = [heroVideo, serviceVideo]

let windowHeight = w.innerHeight
w.addEventListener("resize", () => (windowHeight = w.innerHeight))

// Parralax effects on scroll
const scrollHandler = () => {
  const _scrollTop = w.scrollY // Storing scroll position

  // Hero video has to be paused when scrolled down for the high of 2x viewport
  if (_scrollTop > windowHeight * 2 && !heroVideo.paused) heroVideo.pause()
  else if (_scrollTop <= windowHeight * 2 && heroVideo.paused) heroVideo.play()

  // Navigation drops down after scrolled down for 200px
  if (_scrollTop >= 200 && !navContainer.classList.contains("dropped"))
    navContainer.classList.add("dropped")
  else if (_scrollTop < 200 && navContainer.classList.contains("dropped"))
    navContainer.classList.remove("dropped")

  // Parallex NavLinks unless page scrolled down for 200px, then stick to top.
  navLinks.setAttribute(
    "style",
    `top: ${_scrollTop <= 200 ? 50 - _scrollTop * 0.25 : 0}px`
  )

  // Hero section parallex effect unless scrolled full page down
  if (_scrollTop <= windowHeight) {
    heroLogo.setAttribute("style", `top: ${_scrollTop * 0.4}px`)
    heroParagraph.setAttribute("style", `top: ${_scrollTop * 0.3}px`)
  }

  // if (_scrollTop < 200)
  //   changer.setTop(navLinks, `${_scrollTop * -0.25 + 100}px`)
  // else if (navLinks.style.top != "0px") changer.setTop(navLinks, "0px")
  // // Hero section parallex effect unless scrolled full page down
  // if (_scrollTop <= viewportHeight) {
  //   changer.setTop(heroLogo, `${_scrollTop * 0.6}px`)
  //   changer.setTop(heroParagraph, `${_scrollTop * 0.5}px`)
  // }

  // changer.setTop(serviceVideo, `${_scrollTop - viewportHeight}px`)
}
scrollHandler()
d.addEventListener("scroll", scrollHandler)

// Smooth scroll to section
navLinksArray.forEach((element, i) => {
  element.onclick = (event) => {
    event.preventDefault()
    const targetPosition = sections[i].getBoundingClientRect().top + w.scrollY
    const targetOffset = targetPosition - (i === 0 ? 0 : 60)
    w.scrollTo({ top: targetOffset, behavior: "smooth" })
  }
})

// Team section hover effect
teamCards.forEach((element, index) => {
  element.onmouseenter = () => {
    if (element.classList.contains("team__card-toggled")) return

    teamCards.forEach((_element, _index) => {
      if (_index === index) _element.classList.add("team__card-toggled")
      else _element.classList.remove("team__card-toggled")
    })

    teamBackground.forEach((_element, _index) => {
      if (_index === index) _element.classList.add("show")
      else _element.classList.remove("show")
    })
  }
})
