const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const {buildSchema} = require('graphql')

const app = express();
const events = [
    
];

app.use(bodyParser.json())

app.use('/graphql',graphqlHttp({
    schema:buildSchema(`
        type Event{
            _id:ID!
            tittle: String!
            description: String!
            price:Float!
            date:String!
        }
        type RootQuery{
            events:[Event!]!
        }
        input iEvent{
            tittle: String!
            description: String!
            price:Float!
            date:String!
        }
        type RootMutation{
            createEvent(event:iEvent):Event
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue:{
        events:()=>{
            return events;
        },
        createEvent: (args)=>{
            const event = {
                _id: Math.random().toString(),
                tittle: args.event.tittle,
                description:args.event.description,
                price:+args.event.price,
                date:new Date().toISOString()
            };
            events.push(event)
            return event;
        }
    },
    graphiql:true
}))

app.listen(3000);
