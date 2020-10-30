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
    createGallery();

});

function getDivWithClass(className) {
    let div = document.createElement("div");
    div.className = className;
    return div;
}

function createGallery() {
    const gallery_holder = document.getElementById("images_placeholder");
    if (!galleryObject || galleryObject.length == 0) {
        gallery_holder.innerHTML = `<h5 class="no-images">No Images in Gallery to Edit</h5>`;
        return;
    }

    let rowElement = getDivWithClass("row");
    galleryObject.forEach(element => {
        let columnElement = getDivWithClass("col-md-4");
        let cardMain = getDivWithClass("card");
        cardMain.id = element.id;
        let cardImage = document.createElement("img");
        cardImage.src = element.url;
        cardImage.className = "card-img-top";
        cardImage.alt = element.name;
        cardMain.appendChild(cardImage);
        let cardBody = getDivWithClass("card-body");
        let cardBodyText = document.createElement("p");
        cardBodyText.className = "card-text";
        cardBodyText.textContent = element.information;
        cardBody.appendChild(cardBodyText);
        cardMain.appendChild(cardBody);
        columnElement.appendChild(cardMain);
        rowElement.appendChild(columnElement);
    });
    gallery_holder.appendChild(rowElement);
}



