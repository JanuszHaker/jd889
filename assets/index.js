
const backgroundImages = [
    "https://i.imgur.com/I9DpAkQ.png",
    "https://i.imgur.com/kwDGU4P.jpeg",
    "https://i.imgur.com/abgeyOw.jpeg",
    "https://i.imgur.com/wVlMKvY.jpeg",
    "https://i.imgur.com/JTL7t3A.jpeg",
    "https://i.imgur.com/UeOR9oF.jpeg",
    "https://i.imgur.com/xCTfBeo.jpeg",
    "https://i.imgur.com/d5uPPgl.jpeg",
    "https://i.imgur.com/95b6mrj.jpeg"
];

// Preload all background images
backgroundImages.forEach((src) => {
    const img = new Image();
    img.src = src;
});

let currentBgIndex = 0;
const bgSlide1 = document.querySelector(".bg-slide-1");
const bgSlide2 = document.querySelector(".bg-slide-2");
let activeSlide = 1;

if (bgSlide1 && bgSlide2) {
    bgSlide1.style.backgroundImage = `url('${backgroundImages[0]}')`;
    bgSlide1.classList.add("active");

    setInterval(() => {
        currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
        const nextUrl = backgroundImages[currentBgIndex];

        if (activeSlide === 1) {
            bgSlide2.style.backgroundImage = `url('${nextUrl}')`;
            bgSlide2.classList.add("active");
            bgSlide1.classList.remove("active");
            activeSlide = 2;
        } else {
            bgSlide1.style.backgroundImage = `url('${nextUrl}')`;
            bgSlide1.classList.add("active");
            bgSlide2.classList.remove("active");
            activeSlide = 1;
        }
    }, 3000);
}

var selector = document.querySelector(".selector_box");
selector.addEventListener('click', () => {
    if (selector.classList.contains("selector_open")){
        selector.classList.remove("selector_open")
    }else{
        selector.classList.add("selector_open")
    }
})

document.querySelectorAll(".date_input").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown")
    })
})

var sex = "m"

document.querySelectorAll(".selector_option").forEach((option) => {
    option.addEventListener('click', () => {
        sex = option.id;
        document.querySelector(".selected_text").innerHTML = option.innerHTML;
    })
})

var upload = document.querySelector(".upload");

var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

document.querySelectorAll(".input_holder").forEach((element) => {

    var input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    });
    input.addEventListener('input', () => {
        element.classList.remove("error_shown");
    });

});

upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown")
});

imageInput.addEventListener('change', (event) => {

    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");
    upload.removeAttribute("selected");

    var file = imageInput.files[0];
    if (!file) {
        upload.classList.remove("upload_loading");
        return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
        var img = new Image();
        img.onload = function() {
            var canvas = document.createElement('canvas');
            var maxDim = 400;
            var width = img.width;
            var height = img.height;
            if (width > height) {
                if (width > maxDim) {
                    height = Math.round((height * maxDim) / width);
                    width = maxDim;
                }
            } else {
                if (height > maxDim) {
                    width = Math.round((width * maxDim) / height);
                    height = maxDim;
                }
            }
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            var url = canvas.toDataURL('image/jpeg', 0.85);

            upload.classList.remove("error_shown");
            upload.setAttribute("selected", url);
            localStorage.setItem("user_image", url);
            upload.classList.add("upload_loaded");
            upload.classList.remove("upload_loading");
            upload.querySelector(".upload_uploaded").src = url;
        };
        img.onerror = function() {
            upload.classList.remove("upload_loading");
        };
        img.src = e.target.result;
    };
    reader.onerror = function() {
        upload.classList.remove("upload_loading");
    };
    reader.readAsDataURL(file);

})

document.querySelector(".go").addEventListener('click', () => {

    var empty = [];

    var params = new URLSearchParams();

    params.set("sex", sex)
    if (!upload.hasAttribute("selected")){
        empty.push(upload);
        upload.classList.add("error_shown")
    }else{
        var imgUrl = upload.getAttribute("selected");
        localStorage.setItem("user_image", imgUrl);
        if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://")) {
            params.set("image", imgUrl);
        }
    }

    var birthday = "";
    var dateEmpty = false;
    document.querySelectorAll(".date_input").forEach((element) => {
        birthday = birthday + "." + element.value
        if (isEmpty(element.value)){
            dateEmpty = true;
        }
    })

    birthday = birthday.substring(1);

    if (dateEmpty){
        var dateElement = document.querySelector(".date");
        dateElement.classList.add("error_shown");
        empty.push(dateElement);
    }else{
        params.set("birthday", birthday)
    }

    document.querySelectorAll(".input_holder").forEach((element) => {

        var input = element.querySelector(".input");

        if (isEmpty(input.value)){
            empty.push(element);
            element.classList.add("error_shown");
        }else{
            params.set(input.id, input.value)
        }

    })

    if (empty.length != 0){
        empty[0].scrollIntoView();
    }else{

        forwardToId(params);
    }

});

function isEmpty(value){

    let pattern = /^\s*$/
    return pattern.test(value);

}

function forwardToId(params){

    location.href = "id.html?" + params;

}

var guide = document.querySelector(".guide_holder");
guide.addEventListener('click', () => {

    if (guide.classList.contains("unfolded")){
        guide.classList.remove("unfolded");
    }else{
        guide.classList.add("unfolded");
    }

})
