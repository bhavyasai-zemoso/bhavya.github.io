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

function getButtonWithNameAndAttrs(name, attrObj) {
    let button = document.createElement("button");
    for (const [key, value] of Object.entries(attrObj)) {
        button.setAttribute(key, value);
    }
    button.textContent = name;
    return button;
}

function readGallery() {
    const gallery_holder = document.getElementById("images_placeholder");
    if (!galleryObject || galleryObject.length == 0) {
        gallery_holder.innerHTML = `<h5 class="no-images">No Images in Gallery to Edit</h5>`;
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
        let cardBodyTextObj = document.createElement("p");
        cardBodyTextObj.className = "card-text";
        cardBodyTextObj.textContent = element.information;
        cardBodyObj.appendChild(cardBodyTextObj);
        cardObj.appendChild(cardBodyObj);
        let cardFooterObj = getDivWithClass("card-footer");
        cardFooterObj.appendChild(getButtonWithNameAndAttrs("EDIT", {
            "class": "btn btn-primary",
            "data-toggle": "modal",
            "data-target": "#editModal",
            "data-id": element.id,
            "data-type": "edit"
        }))
        cardFooterObj.appendChild(getButtonWithNameAndAttrs("DELETE", {
            "class": "btn btn-danger float-right",
            "data-toggle": "modal",
            "data-target": "#deleteModal",
            "data-id": element.id
        }))
        cardObj.appendChild(cardFooterObj);
        colChild.appendChild(cardObj);
        innerObj.appendChild(colChild);
    });
    gallery_holder.appendChild(innerObj);
}


let date = document.getElementById("image-date");

date.addEventListener("input", function(event) {
    //console.log(date.value);
    if (!date || (new Date(date.value)).getTime() > (new Date()).getTime()) {
        date.setCustomValidity("Please do not enter the future date");
    } else {
        date.setCustomValidity("");
    }
});

let imgUrl = document.getElementById("image-url");

imgUrl.addEventListener("input", function(event) {
    console.log(imgUrl.validity);
    if (imgUrl.validity.patternMismatch) {
        //console.log("inside1")
        imgUrl.setCustomValidity("Please provide a valid URL.");
    } else {
        //console.log("inside")
        imgUrl.setCustomValidity("");
    }
});

function deleteObject(id) {
    id = parseInt(id);
    galleryObject = galleryObject.filter(obj => obj.id != id);
    localStorage.setItem("gallery", JSON.stringify({ gallery: galleryObject }));
    location.reload();
}

$('#deleteModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget)
    var id = parseInt(button.data('id'))
    var modal = $(this)
    console.log(galleryObject, id)
    console.log(galleryObject.find(obj => obj.id == id))
    modal.find('#deleteImagePlaceholder').attr('src', galleryObject.find(obj => obj.id == id).url);
    modal.find("#deleteSubmit").attr("onclick", `deleteObject(${id})`);
})

$('#editModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget)
    var object = galleryObject.find(obj => obj.id == parseInt(button.data('id')))
    var modal = $(this)
    if (object) {
        var date = new Date(object.date);
        console.log(date)
        /*var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var date_formatted = date.getFullYear() + "/" + (month) + "/" + (day);
        console.log(date_formatted)*/
        modal.find("#image-id").val(object.id);
        modal.find("#image-name").val(object.name)
        modal.find("#image-url").val(object.url)
        modal.find("#image-date").val(object.date)
        modal.find("#image-information").text(object.information)
    } else {
        modal.find("#image-id").val(null);
        modal.find("#image-name").val(null)
        modal.find("#image-url").val(null)
        modal.find("#image-date").val(null)
        modal.find("#image-information").text(null)

    }

})

$("#editForm").submit(function(event) {
    const id = parseInt($("#image-id").val())
    const name = $("#image-name").val();
    const information = $("#image-information").val();
    const date = $("#image-date").val();
    const url = $("#image-url").val();
    //console.log(id, name, information, date)
    galleryObject.map(obj => {
        if (obj.id == id) {
            obj.name = name;
            obj.information = information;
            obj.date = (new Date(date)).getTime();
            obj.url = url;
        }
    })
    if (!id) {
        galleryObject.push({
                id: (new Date()).getTime(),
                name,
                information,
                url,
                date: (new Date(date)).getTime()
            })

    }
    localStorage.setItem("gallery", JSON.stringify({ gallery: galleryObject }))
    event.preventDefault();
    location.reload();
})