import express from 'express'
import passport from 'passport'
import dotenv from 'dotenv'
import util from 'util'
import url from 'url'
import querystring from 'querystring'

dotenv.config();

export default class Auth {
	static up(app) {
		app.get('/login', passport.authenticate('auth0', {
			scope: 'openid email profile'
		}), function (req, res) {
			res.redirect('/');
		});

		app.get('/callback', function (req, res, next) {
			passport.authenticate('auth0', function (err, user, info) {
				if (err) { return next(err); }
				if (!user) { return res.redirect('/login'); }
				req.logIn(user, function (err) {
					if (err) { return next(err); }
					const returnTo = req.session.returnTo;
					delete req.session.returnTo;
					res.redirect(returnTo || '/user');
				});
			})(req, res, next);
		});

		app.get('/logout', (req, res) => {
			req.logout();

			var returnTo = req.protocol + '://' + req.hostname;
			var port = req.connection.localPort;
			if (port !== undefined && port !== 80 && port !== 443) {
				returnTo += ':' + port;
			}
			var logoutURL = new url.URL(
				util.format('https://%s/v2/logout', process.env.AUTH0_DOMAIN)
			);
			var searchString = querystring.stringify({
				client_id: process.env.AUTH0_CLIENT_ID,
				returnTo: returnTo
			});
			logoutURL.search = searchString;

			res.redirect(logoutURL);
		});
	}
}