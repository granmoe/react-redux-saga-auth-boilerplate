# To Do
* "last time you logged in with" change lock config so it still shows all avail ways to login
* local storage not working
* style profile page
* redirect on login based on last page user hit before login page (may need proxy saga that sends each page requested to redux but only pushes route if auth is ok)
* set user profile
  * https://auth0.com/docs/quickstart/spa/react/04-user-profile
* link account if main / current identities differ (use rule?)
  * https://auth0.com/docs/quickstart/spa/react/05-linking-accounts
* logout

* react router
  * create routes that require login, admin
  * if redirected to login, go back to requested route
  * https://react-router.now.sh/quick-start
* Update readme

# Optimizations
* bootstrap data from localStorage (token, profile)
* google material-ui
* mock some basic db integration using sheetsu or similar
* Use an auth0 rule to "Keep a white-list of users and deny access based on email."
  * https://auth0.com/docs/rules
* HMR for LESS
* https://auth0.com/docs/tutorials/creating-invite-only-applications

* add app client id and secret for these:
  * github
  * ms live
  * twitter
  * linked in
  (facebook and google enabled currently)
