/*global window*/
import Parse from 'parse'
var Fluxxor = require('fluxxor')
var React = require('react')
var render = require('react-dom').render
var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var State = ReactRouter.State
var IndexRoute = ReactRouter.IndexRoute
import createBrowserHistory from 'history/lib/createBrowserHistory'

var TrackStore = require('./stores/TrackStore')
var WorldStore = require('./stores/WorldStore')
var ProgramStore = require('./stores/ProgramStore')
var UserStore = require('./stores/UserStore')

import LandingPage from './ui/pages/LandingPage'
var LoginPage = require('./ui/pages/LoginPage')
var LogoutPage = require('./ui/pages/LogoutPage')
var SignUpPage = require('./ui/pages/SignUpPage')
var BrowseWorldsPage = require('./ui/pages/BrowseWorldsPage')
var WorldPage = require('./ui/pages/WorldPage')
var WorldWrapperPage = require('./ui/pages/WorldWrapperPage')
var WorldDefinitionEditorPage = require('./ui/pages/WorldDefinitionEditorPage')
var TrackPage = require('./ui/pages/TrackPage')
var ArthrobotApp = require('./ui/ArthrobotApp')
var LoginAnonymouslyPage = require('./ui/pages/LoginAnonymouslyPage')
var ProfilePage = require('./ui/pages/ProfilePage')
var LeaderboardPage = require('./ui/pages/LeaderboardPage')
var AboutPage = require('./ui/pages/AboutPage')
var WorldDetailsEditorPage = require('./ui/pages/WorldDetailsEditorPage')

import {ParseKeys} from './ParseKeys'
Parse.initialize(ParseKeys.APP_ID, ParseKeys.JS_KEY)
Parse.serverURL = 'https://shrouded-beyond-64667.herokuapp.com/parse'
window.fbAsyncInit = function() {
  Parse.FacebookUtils.init({
    appId      : '366410923540952',
    xfbml      : true,
    version    : 'v2.2',
    cookie     : true
  })
}


var Empty = React.createClass({

  mixins: [State],

  render: function() {
    return this.props.children
  }
})

var stores = {
  TrackStore: new TrackStore(),
  WorldStore: new WorldStore(),
  ProgramStore: new ProgramStore(),
  UserStore: new UserStore()
}
var actions = require('./actions/Actions')
var flux = new Fluxxor.Flux(stores, actions)
flux.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload)
  }
})

render(
  <Router history={createBrowserHistory()} createElement={function(Component, props) {return <Component flux={flux} {...props}/>}}>
    <Route path="/" component={ArthrobotApp}>
      <Route path="worlds" component={Empty}>
        <Route path="/worlds/:worldId" component={WorldWrapperPage}>
          <Route path="/worlds/:worldId/builder" component={WorldDefinitionEditorPage} />
          <Route path="/worlds/:worldId/details" component={WorldDetailsEditorPage} />
          <IndexRoute component={WorldPage} />
        </Route>
        <IndexRoute component={BrowseWorldsPage} />
      </Route>
      <Route path="/profile/:userId" component={ProfilePage} />
      <Route path="/tracks/:trackId" component={TrackPage} />
      <Route path="login" component={LoginPage} />
      <Route path="login-anonymously" component={LoginAnonymouslyPage} />
      <Route path="logout" component={LogoutPage} />
      <Route path="signup" component={SignUpPage} />
      <Route path="leaderboard" component={LeaderboardPage} />
      <Route path="about" component={AboutPage} />
      <IndexRoute component={LandingPage}/>
    </Route>
  </Router>,
  document.getElementById("appcontainer")
)
