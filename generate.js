module.exports = () => {
    const { faker } = require("@faker-js/faker")
    const _ = require("lodash")

    return { posts: _.times(100, function(n) {
                return {
                    id: n, 
                    title: faker.hacker.phrase(),
                    body: faker.lorem.paragraph(),
                    likes: Math.round(Math.random() * 50)
                } 
        })
    }
}
/**
    Creating Demo APIs with json-server
    https://egghead.io/lessons/javascript-creating-demo-apis-with-json-server
 
    npm | @faker-js/faker
    https://www.npmjs.com/package/@faker-js/faker

    npm | lodash 
    https://www.npmjs.com/package/lodash

 */