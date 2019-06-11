const express = require('express')
const cookie = require('cookie-parser')
const fs = require('fs')
const router = express.Router()
router.use(cookie('ajgaiusfho9uhuays7fasfkbasfiuaytfa87sf'))
router.post('/in', (req, res) => {
	var json = req.body
	var data = ''
	var arr = eval(fs.readFileSync('./routes/login.txt', 'utf8'))
	var types = false
	for(var i = 0; i < arr.length; i++) {
		if(arr[i].user == json.user && arr[i].pass == json.pass) {
			types = true
			data = arr[i]
		}
	}
	if(types) {
		req.secret = 'ajgaiusfho9uhuays7fasfkbasfiuaytfa87sf'
		if(json.type == 'true') {
			res.cookie('user', json.user, {
				maxAge: 7 * 24 * 60 * 60 * 1000,
				signed: true
			})
			res.cookie('pass', json.pass, {
				maxAge: 7 * 24 * 60 * 60 * 1000,
				signed: true
			})
		} else {
			res.clearCookie('user')
			res.clearCookie('pass')
		}
res.send(data)
	} else {
		res.send('no')
	}

})

router.get('/auto', (req, res) => {
	console.log(req.signedCookies)
	if(req.signedCookies.user&& req.signedCookies.pass) {
			var json = req.signedCookies
		var arr = eval(fs.readFileSync('./routes/login.txt', 'utf8'))
		for(var i = 0; i < arr.length; i++) {
			if(arr[i].user == json.user && arr[i].pass == json.pass) {
				res.send(arr[i])
			}
		}
	} else {
		res.send('自动登录失败')
	}
})

module.exports = router