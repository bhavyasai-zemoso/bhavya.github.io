let galleryObject;

$(function() {
    if (!galleryObject && !localStorage.getItem("gallery")) {
        $.getJSON("./data.json", function(data) {
            galleryObject = data;
            localStorage.setItem("gallery", JSON.stringify(data));
        });
    } else {
        galleryObject = JSON.parse(localStorage.getItem("gallery"));
        
    }
    galleryObject = galleryObject && galleryObject.gallery ? galleryObject.gallery : null;
    readGallery();
});

function getDivWithClass(className) {
    let div = document.createElement("div");
    div.className = className;
    return div;
}

function readGallery() {
    const gallery_holder = document.getElementById("images_placeholder");
    if (!galleryObject || galleryObject.length == 0) {
        gallery_holder.innerHTML = `<h1 class="no-images">No Images in Gallery</h1>`;
        return;
    }

    
    let innerObj = getDivWithClass("row");
    galleryObject.forEach(element => {
        let colChild = getDivWithClass("col-md-4");
        let cardObj = getDivWithClass("card");
        cardObj.id = element.id;
        let imgObj = document.createElement("img");
        imgObj.src = element.url;
        imgObj.className = "card-img-top";
        imgObj.alt = element.name;
        cardObj.appendChild(imgObj);
        let cardBodyObj = getDivWithClass("card-body");
        let cardBodyTextObj = getDivWithClass("card-text");
        cardBodyTextObj.textContent = element.information;
        cardBodyObj.appendChild(cardBodyTextObj);
        cardObj.appendChild(cardBodyObj);
        colChild.appendChild(cardObj);
        innerObj.appendChild(colChild);
    });
 
    gallery_holder.appendChild(innerObj);
}
