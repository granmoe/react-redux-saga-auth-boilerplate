# To Do
* consolidate auth, linking and profile services. Just store the different lock configs as singletons.
(Don't even need diff locks, just one with merged options passed...then just attempt to make all the calls on login)
(Calls can be invoked from anywhere. Move to sagas.)
Test out the REST API...maybe they have something in docs like postman w a dummy account
* get / set user profile
  * https://auth0.com/docs/quickstart/spa/react/04-user-profile
* link account if both emails verified
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
