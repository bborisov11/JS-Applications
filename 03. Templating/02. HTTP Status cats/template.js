$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        $.get("catTemplate.hbs")
           .then(function (result) {
               let template = Handlebars.compile(result);
               let html = template(cats);
               $("#allCats").append(html);
               let allButton = $("button");
               allButton.each((i, button) => $(button).on("click",function () {
                   let currentButton = $(button);
                   if(currentButton.text() === "Show status code") {
                       currentButton.next().css("display", "block");
                       currentButton.text("Hide status code");
                   } else {
                       currentButton.next().css("display", "none");
                       currentButton.text("Show status code");
                   }
               }))
           }).catch((err) => console.log(err));
    }
});
