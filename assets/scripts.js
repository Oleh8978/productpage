$(window).on("load", function () {
  const dummyData =
    '[{"link":"https://thumbs.dreamstime.com/b/amazon-logo-editorial-vector-illustration-market-136495269.jpg","foodName":"Scrapper","caloriesTxt":"1 item.","setPortion":"","price":"Free", "linkCode":"https://github.com/Oleh8978/amazonScrapper"}]';

  function sliderItemHtml(
    imgLink = "#",
    foodName = "",
    caloriesTxt = "0 calories",
    setPortion = "1 Person",
    price = "0$",
    linkCode = "#"
  ) {
    return `<div class="slider-item">
          <div class="slide">
              <figure class="slide-image">
                  <img src="${imgLink}" alt="">
              </figure>
              <h4 class="slide-name">${foodName}</h4>
              <div class="custom-line"></div>
              <div class="row">
                  <p>${caloriesTxt}</p>
                  <strong>•</strong>
                  <p>${setPortion}</p>
              </div>
              <div class="custom-line"></div>
              <div class="row custom-row">
                  <p>${price}</p>
                  <a href="${linkCode}"><span>&plus;</span></a>
              </div>
          </div>
      </div>`;
  }
  /*generate slider*/
  $(function () {
    const sliderBlock = document.querySelector(".slider");

    if (sliderBlock) {
      JSON.parse(dummyData).map((item) => {
        sliderBlock.insertAdjacentHTML(
          "beforeend",
          sliderItemHtml(
            item.link,
            item.foodName,
            item.caloriesTxt,
            item.setPortion,
            item.price,
            item.linkCode
          )
        );
      });
    }
  });
  $(function () {
    const slider = document.getElementsByClassName("slider").item(0);

    let isDrag = false,
      startPos = 0,
      curIndex = 0,
      curTranslate = 0,
      preTranslate = 0,
      animationId = null;

    $(".slider-item").on("mousedown mousemove mouseup mouseleave", (e) => {
      e.preventDefault();
    });

    slider.onmousedown = startSlide;
    slider.ontouchstart = startSlide;
    slider.onmousemove = moveSlide;
    slider.ontouchmove = moveSlide;
    slider.onmouseup = endSlide;
    slider.onmouseleave = endSlide;
    slider.ontouchend = endSlide;

    function getPositionX(event) {
      return event.type.includes("mouse")
        ? event.pageX
        : event.touches[0].clientX;
    }

    function animation() {
      if (isDrag) requestAnimationFrame(animation);
      setSliderPosition();
    }

    function startSlide(event) {
      startPos = getPositionX(event);
      isDrag = true;
      animationId = requestAnimationFrame(animation);
      $(".slider").removeClass("animation").css("cursor", "grabbing");
    }

    function moveSlide() {
      if (isDrag) {
        const positionX = getPositionX(event);
        curTranslate = preTranslate + positionX - startPos;
      }
    }

    function endSlide() {
      isDrag = false;
      cancelAnimationFrame(animation);
      const Moved = curTranslate - preTranslate;
      if (Moved < -100 && curIndex < $(".slider-item").length - 1 - 2)
        curIndex++;
      if (Moved > 100 && curIndex > 0) curIndex--;
      setPositionByIndex();
      $(".slider").addClass("animation").css("cursor", "grab");
    }

    function setPositionByIndex() {
      curTranslate = ($(".slider-item").width() + 40) * curIndex * -1;
      preTranslate = curTranslate;
      setSliderPosition();
    }

    function setSliderPosition() {
      $(".slider-container .slider").css(
        "transform",
        `translateX(${curTranslate}px)`
      );
    }
    $(".btn-right").click(() => {
      curIndex =
        ++curIndex < $(".slider-item").length - 1 - 2
          ? curIndex
          : $(".slider-item").length - 1 - 2;
      endSlide();
    });
    $(".btn-left").click(() => {
      curIndex = --curIndex > 0 ? curIndex : 0;
      endSlide();
    });
  });
});
