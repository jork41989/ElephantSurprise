# Elephant Surprise
**[The Elephant Surprise Demo Site](http://elephantsurprise.herokuapp.com/#/)**
### Background and Overview
Elephant Surprise is a gift exchange site designed to enhance the atmosphere of gift giving for any special occasion!
Once signed up, a user can become a host.  Hosts can invite other members of the service to partake in an Exchange of Gifts.  
Members of the Exchange will create their own Wishlists, and once the Exchange is at capacity, the members will be randomly assigned a Gifter who will be anonymously selecting one of their desired gifts and sending it to them!  Happy Gifting!

### ELEPHANT SURPRISE
| **Table of Contents**                       |
| ------------------------------------------- |
| **[Overview](#overview)**                   |
| **[Technologies](#technologies)**           |
| **[Features](#features)**                   |
| **[Upcoming Features](#upcoming-features)** |
| **[Code Implementation](#code-implementation)**         |

### OVERVIEW

The Elephant Surprise webservice allows organizers to quickly put together a gift exchange for their organization, social club or group of friends to make any event more exciting!  Hosts can quickly rapidly create an event, with themes based on the occasion, and search and invite their giftees. Giftees that accept the invites will have a wishlist automatically created on invite acceptance, and their wishlist items can be added,updated and deleted.  Any items linked will be automatically rendered to the page using MicrolinkSDK,being utilized under the free license from MIT.


### Inspiration:
[Elfster](https://www.elfster.com/)

### Technologies and Technical Challenges:
Elephant Surprise is a React-Apollo frontend client with a GraphQL-Express-MongoDB backend server.  Elephant Surprise also makes use of the MicroLinkSDK API for link rendering.

### TECHNOLOGIES
#### Docker:
- [DockerDocs](https://docs.docker.com/)
#### Backend:
- [MongoDB](https://www.mongodb.com/)
- [ExpressJS](http://expressjs.com/)
- [Node.js](https://nodejs.org/en/)
#### Frontend:
- [React](https://reactjs.org/)
- [Apollo](https://www.apollographql.com/docs/react/)
- [Microlink SDK](https://microlink.io/docs/sdk/getting-started/overview/)
#### DETAILED EXPLANATION
##### REACT-APOLLO
The Apollo client allows for responsive handling of backend data without unnecessary load on the client's browser before it's necessary to update the local cache.  
##### EXPRESS-MONGODB-GRAPHQL
Javascript centered syntax, alongside easy to parse functions and one of the most utilized database cloud services creates a backend that is simple to implement, and easy to maintain.  Apollo-GraphQL is a responsive technology that helps the developer more quickly update and generate features that have automatic cache handling.
##### MICROLINK SDK
A third-party API, Microlink SDK seamlessly provides basic information and images from linked items, with an easy to use import and component plug-in system

### FEATURES
#### Dashboard
- Allows Users to create a new Exchange
- Displays Exchanges the User currently belongs to
- Has a toggle for Pending Invites to Exchanges
#### Exchanges
- Exchanges will have Participants that each have a Wishlist.  Exchanges automatically add the host as a Participant on creation as well as generate a wishlist for that host.
- Exchanges can randomly assign Gifters(Santas) to Giftees
#### Wishlists and Items
- Automatically generated on the creation of an Exchange, or the invite acceptance of a user(who becomes a giftee/participant).
- Wishlists display only to assigned Gifters or to the Wishlist Owner
- Shipping Address and Wishlist can only be updated by the Wishlist Owner
- Wishlists preview links utilizing the MicrolinkSDK API


### UPCOMING FEATURES
- More themes!  We'll be adding more themes to fit the needs of more clientele as we expand and scale up.

### CODE IMPLEMENTATION
##### Modal Implementation:

A well-organized and easy to implement modal design allows the frontend client to render based on the type of modal it's expecting to receive.

```javascript

function Modal({ type, closeModal, exchange_id }) {
  if (!type) {
    return null;
  }

  let component;
  switch(type){
    case 'login':
      component = <Login closeModal={closeModal}/>;
      break;
    case 'signup':
      component = <Signup closeModal={closeModal}/>;
      break;
    case 'search_user':
      component = <SearchUser closeModal={closeModal} exchange_id={exchange_id}/>;
      break;
    default:
      return null;
  }

//...

```
##### Invite Search:

The user search feature allows hosts to quickly lookup and invite the participants of their with a field that anticipates their possible targets

```javascript
//...

<Query query={SEARCH_USER} variables={{ key_word: this.state.key_word }}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`
            if (data && data.searchUser.length > 0) {
              const user_lis = data.searchUser.map(
                user => { return (
                  <li key={user._id}>
                    <div onClick={() => {this.addToList(user)}} id="user-item">
                      {user.name}
                    </div>
                    <i className="fas fa-check-circle" onClick={() => { this.removeFromList(user) }} id={user._id} />
                  </li>
                );}
              );
                
              return (
                <div className="search-list">
                <ul>
                  {user_lis}
                </ul>
                </div>
                
              );
            } else if (data && data.searchUser.length === 0) {
              return "No User Found.";
            }
          }}
        </Query>
        }
        </div>
        <div className="searchUserlist">
          {this.listDiv()}
        </div>
        <p>{this.state.message}</p>
        <div>
          <Mutation
            mutation={INVITE_USER}
            onError={err => this.setState({ message: err.message })}
            onCompleted={data => {
              this.setState({
                message: "Invitations Sent!"
              });
              this.clearList();
            }}
          >
            {(addInvite, { data }) => (
              
              <button onClick={e => this.sendInvite(e, addInvite)} className="searchButton">Send Invitations!</button>
              
            )}
          </Mutation>

//...

```