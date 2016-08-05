## js-starter with react react-router babel sass and eslint
____
# HW4 Blog By Josh Kerber
____

## What I did

  * For this homework, I created a fully functional online blog through React Redux, in which you can add, remove, and edit posts from. That backend functionality was given to us, and uses an API server to store data hosted at http://cs52-blog.herokuapp.com/api. When an action is called from a container (i.e. deletepost is called when the trash icon is clicked), the DELETE_POST action type is activated from .../actions/index.js and a post is deleted. The payload is then transmitted to the reducer to update the global state of the app. Through Redux's actions, components, containers, and reducers, data flowed efficiently from the server onto the webpage.

## What worked/didn't work

  * Because of Redux's complicated data flow, I planned before I coded which helped me out tremendously. I read notes on redux along with cs52 lecture notes on redux to make I knew how to efficiently transmit data throughout my app.

## Extra credit attempted

  * I attempted to add a pop-up window based alert that would confirm if you wanted to delete a post, however es-lint didn't like javascript's 'alert' function, and told me I had to use my own custom alert function. I then bailed on this idea.

  * I attempted and SUCCEEDED! in implementing a checker that makes sure you enter a title before you add a post. Blog posts can be created without any tags or content, but they need a title and I checked for that. I did this by doing the following

    * In the add post element, the placeholder text for the title field was set to this.state.ph.

    * When the user tries to create a post without a title, I change this.state.ph to "\***Title required!".

    * This changes the placeholder text of the title field, thus reminding the user to enter a title.
