const userModel = (function () {
    let userUrl = `user/${storage.appKey}`;

    const login = function(username, password){
        let authString = btoa(`${username}:${password}`);
        let headers = {
            Authorization: 'Basic ' + authString 
        };

        let data = { username, password };
        let url = userUrl + '/login';
        
        return requester.post(url, data, headers);
    };

    const logout = function(){
        let url = userUrl +  '/_logout';

        return requester.post(url);
    };

    const register = function(params){
        let data = {
            username: params.username,
            password: params.password,
            email: params.email,
            avatarUrl: params.avatarUrl
        };

        let authString = btoa(`${storage.appKey}:${storage.appSecret}`);
        let headers = { Authorization: 'Basic ' + authString};
        
        return requester.post(userUrl, data, headers);
    };
    const details = function () {
        let url = userUrl + "/" + storage.getData('userInfo').id;
      return requester.get(url);
    };

    const isAuthorized = function(){
        return !!storage.getData('authToken');
    };

    return {
        login,
        logout,
        details,
        register,
        isAuthorized
    }
}());