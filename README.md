# CODEpendency

CODEpendency is a fun and engaging study platform that was developed to help Epicodus students prepare for technical interviews.

4/10/17 - 4/13/17

CODEpendency is hosted at [CODEpendency](https://ptfc-dbccf.firebaseapp.com/)

## To run CODEpendency from a personal computer:


You will need the following properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Angular CLI](https://ember-cli.com/)
* [Bower](https://bower.io/)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Planning

  1. Configuration/dependencies
    * Bootstrap: angular-cli.json
    * All other other dependencies are installed by Angular2 and located in angular-cli.json

  2. User stories to fulfill:

    * As a user, I'd like to be able to create, edit, and delete my own decks
    * As a user, I'd like to be able to create, edit, and delete questions in each of my decks
    * As a user, I'd like to be able to view all of my decks
    * As a user, I'd like to select a category and see all decks associated with that category
    * As a user, I'd like to be able to view all questions associated with a category
    * As a user, I'd like to be able to view questions in an individual deck
    * As a user, I'd like to be able to view questions one at a time
    * As a user, I'd like questions to appear one at a time in a random order
    * As a user, I'd like to be able to view the answer to a question after I guess the answer in my head
    * As a user, I'd like to be able to record if I correctly guessed the answer
    * As a user, I'd like questions that I get wrong to appear more frequently than questions I get right

  3. What does this project require?

    * model for decks
    * model for questions
    * model for users
    * component for displaying all categories
    * component for displaying all decks and questions by category
    * component for logging in a user
    * component for creating a new deck
    * component for creating new questions for a deck and editing the deck and questions
    * component for displaying all of a user's decks
    * hook up firebase to store all of the data
    * services to grab the information from the database and inject all the information to the pages that need that info
    * custom pipe for filtering decks and questions by category
    * dynamic routing for each category and deck

  4. UX/UI
    * Include and modify bootstrap
    * Develop custom style

  5. Polish
    * Refactor all files to include as little code as possible
    * Remove console.logs and commented out code
    * Make README awesome

## Technologies Used
  * **HTML**: Hypertext Markup Language, a standardized system for tagging text files to achieve font, color, graphic, and hyperlink effects on World Wide Web pages.
  * **CSS**: The Cascading Style Sheets Specification is a computer language that is used to write formatting instructions.
  * **JavaScipt**: An object-oriented computer programming language commonly used to create interactive effects within web browsers.
  * **Angular2**: Angular2 is a JavaScript framework for creating web applications.
  * **Typescript**: Typescript is a free and open-source programming language developed and maintained by Microsoft. It is a strict superset of JavaScript, and adds optional static typing and class-based object-oriented programming to the language.
  * **npm**: A NodeJS package manager. You can use it to install node programs. Also, if you use it in development, it makes it easier to specify and link dependencies.
  * **bower**: bower js is used for managing front end components like html, css, js etc.

## CODEpendency Team:
  [Keith Evans](https://github.com/KWLEvans), [Jennifer Beem](https://github.com/jeemb), [Charles Peden](https://github.com/ccbpeden), [Sean Peterson](https://github.com/Sean-Peterson)
