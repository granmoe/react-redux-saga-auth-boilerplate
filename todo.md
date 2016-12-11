* Move auth logic into auth duck saga code and just import auth0 there
  * bootstrap data from localStorage (auth token)
* HMR for LESS
* react router
  * create routes that require login, link
  // TODO: If redirected to login, go back to requested route
  https://react-router.now.sh/quick-start
* logout
* link account
* user profile
* full auth flow (if login required for route and !loggedIn, login; if account required and no account, link account)
  https://auth0.com/docs/quickstart/spa/react/04-user-profile
* consider moving login flow into a saga

!loggedIn ? 
  login :
  !linked ?
    link account :
    profile
  logout

mock some db stuff (maybe json server)

