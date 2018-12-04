function attachEvents() {
    $("#btnLoadTowns").on("click",function () {
      let towns = $("#towns").val().split(", ");
      let source = $("#towns-template").html();
      let template = Handlebars.compile(source);
      let html = template(towns);
      $("#root").append(html);
        $("#towns").val('');
    })
}
