const photos = Array.from(document.querySelectorAll(".polaroid"));
const placedPhotos = [];

function placePhoto(img) {

  const zone = document.querySelector(".lower-zone");
  const zoneRect = zone.getBoundingClientRect();
  const imgWidth = img.offsetWidth;
  const imgHeight = img.offsetHeight;

  const minSpacing = 18;

  let attempts = 0;
  let finalLeft, finalTop;

  function overlaps(left, top) {
    return placedPhotos.some(p =>
      left < p.left + p.width + minSpacing &&
      left + imgWidth > p.left - minSpacing &&
      top < p.top + p.height + minSpacing &&
      top + imgHeight > p.top - minSpacing
    );
  }

  while (attempts < 200) {
    attempts++;

    let left = Math.random() * (zoneRect.width - imgWidth);
    let top  = Math.random() * (zoneRect.height - imgHeight);

    if (!overlaps(left, top)) {
      finalLeft = left;
      finalTop = top;
      break;
    }
  }

  if (finalLeft === undefined) {
    finalLeft = 10 + Math.random() * (zoneRect.width - imgWidth - 20);
    finalTop  = 10 + Math.random() * (zoneRect.height - imgHeight - 20);
  }

  placedPhotos.push({
    left: finalLeft,
    top: finalTop,
    width: imgWidth,
    height: imgHeight
  });

  img.style.left = `${finalLeft}px`;
  img.style.top  = `${finalTop}px`;
  img.style.transform = `rotate(${(Math.random() * 16) - 8}deg)`;
  img.style.opacity = 1;
}

let index = 0;
function showNextPhoto() {
  if (index >= photos.length) {
    document.body.classList.add("fadeout");
    setTimeout(() => {
      window.location.href = "landing_page.html";
    }, 700);

    return;
  }


  placePhoto(photos[index]);
  index++;

  setTimeout(showNextPhoto, 140);
}

showNextPhoto();
