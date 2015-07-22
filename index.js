$(function () {
// push new code to repo
// then do a pull request

// on button/link click for each user clear page and show permissions for that user	


// Users Template
function renderUsers(user) {
	var tmpl = $('#user-template').html()
	var userTmpl = Handlebars.compile(tmpl)
	var data = {
		user: user
	}
	return userTmpl(data)
}

// Permissions template
function renderPerms(perm) {
	var tmpl = $('#perm-template').html()
	var permTmpl = Handlebars.compile(tmpl)
	var data = {
		perm: perm
	}
	return permTmpl(data)
}

// show users
$('button').on('click', function () {
	event.preventDefault()
	$('.data').show().html('')
	$('.permissions').hide()
	$.get('http://localhost:3000/users')
		.done(function (users) {
			users.forEach(function (user) {
				$('.data').append(renderUsers(user))	
			})
	})
})

// show permissions:
 $('ul').on('click', 'a', function () {
 	event.preventDefault()
 	$('.data').hide()
 	$('.permissions').show().html("<h3>This user's permissions are:</h3>")
 	var idNum = $(this).closest('li').data('id')  
 	$.get('http://localhost:3000/permissions').done(function (perms) {
 		perms.forEach(function (perm) {
 			if (perm.userId == idNum) {
 				$('.permissions').append(renderPerms(perm.permissions))
 			}
 		})
 	})
 })




})