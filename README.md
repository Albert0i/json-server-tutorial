# Simplicity but not simple

[![alt The Unparalleled Adventure of One Hans Pfaall](img/The_Unparalleled_Adventure_of_One_Hans_Pfaall.png)](https://www.youtube.com/watch?v=FZ7qdTV4ouo)

## Forward
It was a hot day after mid-autumn. The whole city was enshrouded by moan and deadly pain. Every pores were blocked with dirt, respiratory was scarcely possible. Stalking through the dust, I managed to reach the station and get ready for return carriage. Neither stars nor crescent presented in the firmament. 

## I. To prepare
> Get a full fake REST API with zero coding in less than 30 seconds (seriously)
```bash
npm install json-server --save-dev
```
package.json
```json
{
  "name": "json-server-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "json-server": "json-server --watch data/db.json --port 3000 --static ./"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "json-server": "^0.17.0"
  }
}
```
```
  --port, -p         Set port                                    [default: 3000]
  --watch, -w        Watch file(s)                                     [boolean]
  --static, -s       Set static files directory
```

## II. To put in work 
```bash
npm run json-server
```
![alt json server](img/json_server.JPG)

## III. To Round up
- Navigate to <code>http://localhost:3000</code>, or 

- Right-click on <code>index.html</code> and choose <code>Open with [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)</code> in <code>[VSCode](https://code.visualstudio.com/)</code>

Either way will work as expected. 

![alt All Blogs](img/All_Blogs.JPG)

## IV. Reference
1. [Up & Running with JSON Server (Part 1)](https://www.youtube.com/watch?v=mAqYJF-yxO8)
2. [Up & Running with JSON Server (Part 2)](https://www.youtube.com/watch?v=VF3TI4Pj_kM)
3. [typicode/json-server](https://github.com/typicode/json-server)
4. [The Unparalleled Adventure of One Hans Pfaall](https://poemuseum.org/the-unparalleled-adventure-of-one-hans-pfaall/)


## EOF (2022/09/19)