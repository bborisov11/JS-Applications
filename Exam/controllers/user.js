const user = (function(){
    const getLogin = function(ctx){
        ctx.partial('views/user/login.hbs');
    };

    const postLogin = function(ctx){
        var username = ctx.params.username;
        var password = ctx.params.password;
        
        userModel.login(username, password).done(function(data){
            storage.saveUser(data);
            notification.info("Login successful.");
            ctx.redirect('#/');
        }).fail(function () {
            notification.error("Wrong username or password");
        })
    };

    const logout = function(ctx){
        userModel.logout().done(function(){
            storage.deleteUser();
            notification.info("Logout successful.");
            ctx.redirect('#/');
        });
    };

    const getRegister = function(ctx) {
        ctx.partial('views/user/register.hbs');
    };

    const postRegister = function(ctx) {
        userModel.register(ctx.params).done(function(data){
            storage.saveUser(data);
            notification.info("User registration successful.");
            ctx.redirect('#/');
        }).fail(function () {
            notification.error("There is such user already!");
        });
    };

    const initializeLogin = function(){
      //  if(userModel.isAuthorized()){
      //      $("#loggedIn").addClass("d-none");
      //      $("#notLoggedIn").removeClass("d-none");
      //  } else {
      //      $("#loggedIn").removeClass("d-none");
      //      $("#notLoggedIn").addClass("d-none");
      //  }
    };

    return {
        getLogin,
        postLogin,
        logout,
        getRegister,
        postRegister,
        initializeLogin
    };
}());