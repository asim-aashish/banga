var router = require('express').Router(),
	Userroute = require('./allroutes/user').Userroute,
	Postroute = require('./allroutes/post').Postroute,
	Notificationroute = require('./allroutes/notification').Notificationroute;

router.post('/upload',Userroute.UploadProfilePicture);
router.post('/signup', Userroute.doUserSignUp);
router.post('/login', Userroute.doUserLogin);
router.delete('/logout',Userroute.doUserLogOut);
router.get('/', Postroute.displayMainPage);
router.get('/user',Userroute.getUserbySessionId);
router.post('/post', Postroute.postaPost);
router.put('/profile/edit', Userroute.modifyUser);
router.get('/profile/:username',Userroute.getUserbyParamName);
router.get('/post/:type',Postroute.getPostsbyType);
router.get('/post',Postroute.getPostsbyMainUser);
router.post('/notification',Notificationroute.CreateNotification);
router.get('/profile', Postroute.getProfilebySessionId);
router.get('/notification',Notificationroute.showNotifications);

module.exports = exports = router;
