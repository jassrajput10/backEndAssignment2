1.project overview
this is my assignment 5, in this we can Create, read, update, and delete tasks, manage user accounts, handle items in your system, Keep everything secure with authentication, developers can use this API to quickly add task management features to their apps!

2. intalllation instruction - we need node,js, npm start, create a firebase account and add a new project into to acces through it, link with github to get updated to the github

3. api request examples
example 1: 
var settings = {
  "url": "http://localhost:3000/api/v1/employees/",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json"
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

example 2: 
var settings = {
  "url": "https://2gjpi5gp8k.execute-api.us-east-1.amazonaws.com/dev/moment/1",
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

example 3:
var settings = {
  "url": "localhost:3000/api/v1/loans",
  "method": "POST",
  "timeout": 0,
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

4. link to public documentation


5.local documentation access
npm start 
http://localhost:3000/api-docs

6. security configuration
i chose  dnsPrefetchControl for helmet because for an API that only returns JSON data, there's no need for the browser to pre-load anything. Disabling it protects user privacy and prevents potential information leaks about what domains our API might reference.
i choose exposedHeaders for cors because Our frontend needs to know how many API requests it has left before hitting the limit. Without this, the app would keep making requests blindly and suddenly get blocked, which creates a bad user experience.