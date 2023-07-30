const imageUpload = document.querySelector("#image-upload");
const dynamicArea = document.querySelector(".dynamic-area");

const progressArea = document.querySelector(".progress-area");

const imageEditor = document.querySelector(".image-editor");

const firstStep = document.querySelector(".first-step");

const progressDot = document.querySelectorAll(".progress-dot");

const progressLineColor = document.querySelector(".progress-line-color");

const imagePreview = document.querySelectorAll(".image-preview");

const uploadBtn = document.querySelectorAll(".upload-new-btn");

const editBtn = document.querySelector(".edit-btn");

const secondStep = document.querySelector(".second-step");

const filters = document.querySelector("#filters");

const filterSetArea = document.querySelector(".filter-range");

const range = document.querySelector("#range");

const saveBtn = document.querySelector(".save-btn");

const rotateXBtn = document.querySelector(".rotate-x");
const rotateYBtn = document.querySelector(".rotate-y");

imageUpload.addEventListener("change", function (e) {
  const src = URL.createObjectURL(e.target.files[0]);
  imagePreview[0].style.backgroundImage = `url('${src}')`;
  imagePreview[1].style.backgroundImage = `url('${src}')`;
  imageEditor.classList.add("image-editor-toggle");
  firstStep.classList.add("step-toggle");
  progressDot[0].checked = true;
  progressDot[1].checked = true;
  progressLineColor.style.width = `${100 / 3 + "%"}`;
  setTimeout(function () {
    progressArea.classList.remove("progress-area-toggle");
  }, 400);
  setTimeout(function () {
    dynamicArea.classList.remove("step-toggle");
  }, 400);
});

uploadBtn[0].addEventListener("click", function () {
  progressDot[0].click();
});

uploadBtn[1].addEventListener("click", function () {
  progressDot[0].click();
});

function progressDotFu() {
  for (let i = 0; i < 4; i++) {
    progressDot[i].addEventListener("click", function () {
      progressDot[i].checked = true;
      progressLineColor.style.width = `${33 * i + "%"}`;
      for (let j = 0; j < i; j++) {
        progressDot[j].checked = true;
      }
      for (let k = 3; k > i; k--) {
        progressDot[k].checked = false;
      }
      if (i != 0) {
        dynamicArea.style.transform = `translateX(${
          -(i - 1) * (100 / 3) + "%"
        })`;
      }
      switch (i) {
        case 0:
          progressDot[0].checked = true;
          progressDot[1].checked = false;
          imageUpload.value = "";
          progressLineColor.style.width = "0";
          dynamicArea.classList.add("step-toggle");
          setTimeout(function () {
            progressArea.classList.add("progress-area-toggle");
          }, 500);
          setTimeout(function () {
            imageEditor.classList.remove("image-editor-toggle");
            firstStep.classList.remove("step-toggle");
            dynamicArea.style.transform = "translateX(0)";
          }, 600);
          break;
        case 3:
          dynamicArea.style.transform = `translateX(${(-100 / 3) * 2 + "%"})`;
          setTimeout(function () {
            domtoimage.toBlob(imagePreview[1]).then(function (blob) {
              window.saveAs(blob, "m.png");
            });
          }, 1000);
          setTimeout(function () {
            progressDot[0].click();
          }, 3000);
          break;
      }
    });
  }
}

editBtn.addEventListener("click", function () {
  progressDot[2].click();
});

function filterSetToggle() {
  if (filters.value) {
    filterSetArea.classList.remove("filter-range-toggle");
    switch (filters.value) {
      case "opacity":
        range.value = 1;
        range.addEventListener("change", function () {
          imagePreview[1].style.filter = `opacity(${range.value})`;
        });
        break;
      case "blur":
        range.value = 0;
        range.addEventListener("change", function () {
          imagePreview[1].style.filter = `blur(${range.value * 10 + "px"})`;
        });
        break;
      case "brightness":
        range.value = 1;
        range.addEventListener("change", function () {
          imagePreview[1].style.filter = `brightness(${range.value})`;
        });
        break;
      case "contrast":
        range.value = 1;
        range.addEventListener("change", function () {
          imagePreview[1].style.filter = `contrast(${range.value})`;
        });
        break;
      case "grayscale":
        range.value = 0;
        range.addEventListener("change", function () {
          imagePreview[1].style.filter = `grayscale(${range.value})`;
        });
        break;
      case "invert":
        range.value = 0;
        range.addEventListener("change", function () {
          imagePreview[1].style.filter = `invert(${range.value})`;
        });
        break;
      case "saturate":
        range.value = 1;
        range.addEventListener("change", function () {
          imagePreview[1].style.filter = `saturate(${range.value})`;
        });
        break;
      case "sepia":
        range.value = 1;
        range.addEventListener("change", function () {
          imagePreview[1].style.filter = `opacity(${range.value})`;
        });
        break;
    }
  } else {
    filterSetArea.classList.add("filter-range-toggle");
  }
}

rotateXBtn.addEventListener("click", function () {
  imagePreview[1].classList.toggle("rotate-x-toggle");
});
rotateYBtn.addEventListener("click", function () {
  imagePreview[1].classList.toggle("rotate-y-toggle");
});

saveBtn.addEventListener("click", function () {
  progressDot[3].click();
});
filters.addEventListener("change", filterSetToggle);
progressDotFu();
