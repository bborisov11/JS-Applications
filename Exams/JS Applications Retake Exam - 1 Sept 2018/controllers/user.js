const user = (function(){
    const getLogin = function(ctx){
        ctx.partial('views/user/login.hbs');
    };

    const postLogin = function(ctx){
        let username = ctx.params.username;
        let password = ctx.params.password;
        
        userModel.login(username, password).done(function(data){
            storage.saveUser(data);
            notification.info("Login successful.");
            ctx.redirect('#/');
        }).fail(function () {
            notification.error("Wrong username or password");
        });
    };

    const logout = function(ctx){
        userModel.logout().done(function(){
            storage.deleteUser();
            notification.info("Logout successful!");
            ctx.redirect('#/login');
        });
    };

    const getRegister = function(ctx) {
        ctx.partial('views/user/register.hbs');
    };

    const postRegister = function(ctx) {
        userModel.register(ctx.params).done(function(data){
            storage.saveUser(data);
            notification.info("User registered successful!");
            ctx.redirect('#/');
        });
    };

    const getDetails = function (ctx) {
            userModel.details().done(function (data) {
                memeModel.getAllforGivenUser().then(function(memes) {
                ctx.username = data.username;
                ctx.email = data.email;
                ctx.avatarUrl = data.avatarUrl;

                ctx.memes = memes;
                ctx.partial("./views/user/myProfile.hbs");

                    });
                });
    };

    const initializeLogin = function(){
        if(userModel.isAuthorized()){
            $("#create-meme").removeClass("d-none");
            $("#logout-option").removeClass("d-none");
        } else {
            $("#create-meme").addClass("d-none");
            $("#logout-option").addClass("d-none");
        }
    };

    return {
        logout,
        getLogin,
        postLogin,
        getDetails,
        getRegister,
        postRegister,
        initializeLogin
    };
}());