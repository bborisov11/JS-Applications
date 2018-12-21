const meme = (function () {
        const getCreate = function (ctx) {
            if(userModel.isAuthorized()) {
                ctx.partial("./views/meme/create.hbs");
            } else {
                ctx.partial("./views/index/index.hbs");
            }
        };

        const postCreate = function (ctx) {
          let creator = storage.getData('userInfo').username;
          let title = ctx.params.title;
          let description = ctx.params.description;
          let imageUrl = ctx.params.imageUrl;

          memeModel.create(creator, title, description, imageUrl).done(function () {
              notification.info("meme created.");
          }).fail(function () {
              notification.error("Incorrect filled field!");
          })
        };

        return {
            getCreate,
            postCreate
        }
}());