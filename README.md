# Elephant Surprise

## Background and Overview

 Elephant Surprise is a gift exchange site designed to enhance the atmosphere of gift giving for any special occasion!
 Once signed up, a user can become a host.  Hosts can invite other members of the service to partake in an Exchange of Gifts.  
 Members of the Exchange will create their own Wishlists, and once the Exchange is at capacity, the members will be randomly assigned a Gifter who will be anonymously selecting one of their desired gifts and sending it to them!

## MVP List

* User Auth

* Exchange creation

* Exchange user onboarding

* List creation

* Assign list fuctionality

* Mark as purchased functionality 

Bonus

* Proof of shipping

* OAuth

* Gift posting thread


## Technologies and Technical Challenges

- Docker
- GraphQL
- React
- Express
- MongoDB
  


## Schema

### User
  - name
  - email
  - PW digest
  - hosted exchanges [ ids ]
  - participated exchanges [ ids ]
  - owned lists [ ids ]

### Exchanges
  - name
  - start date
  - ship date
  - budget
  - gifts assigned  - bool
  - owner_id 
  - users [ ids ]
  - lists [ ids ]


### Lists
  - owner - id
  - items [ ids ]
  - exchange - id
  - Shipping info
  - assigned - gifter 

### Items
  - link
  - price
  - purchased - bool
