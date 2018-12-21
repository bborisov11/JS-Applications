const storage = function () {
    const appKey = 'kid_rkS0IgyxE';
    const appSecret = '5cc6e9ce61fd4f719d79b1198335c97b';

    const saveData = function (key, value) {
        localStorage.setItem(appKey + key, JSON.stringify(value));
    };

    const getData = function (key) {
        return JSON.parse(localStorage.getItem(appKey + key));
    };

    const deleteData = function(key) {
        localStorage.removeItem(appKey + key);
    };

    const saveUser = function(data){
        saveData('userInfo', {
            id: data._id,
            username: data.username,
            email: data.email,
            avatarUrl: data.avatarUrl
        });

        saveData('authToken', data._kmd.authtoken);
    };

    const deleteUser = function(){
        deleteData('authToken');
        deleteData('userInfo');
    };

    return {
        saveData,
        getData,
        deleteData,
        appKey,
        appSecret,
        saveUser,
        deleteUser
    };
}();