const home = (function(){
    const index = function(ctx) {
        if(userModel.isAuthorized()) {
            memeModel.getMemes().then(function(data) {
                ctx.memes = data;

                ctx.partial("./views/index/loggedInIndex.hbs");
            });
        } else {
            ctx.partial("./views/index/index.hbs");
        }
    };
    return {
        index
    };
}());