const users =[];
//join users to chat
function userjoin(id,username,room){
    const user = {id,username,room};
    users.push(user);
    return user;
}

function getCurrentUser(id){
    return users.find(user=>user.id==id);
}

module.exports = {
    userjoin,
    getCurrentUser
};