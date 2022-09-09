<img width="300" src="https://logixboard.com/wp-content/uploads/2022/07/logo-dark.svg" />

# Challenge

- Fixed ShipmentsPage height to do not scroll and limit items per page
- Created page to view shipments arriving of the next seven days
- Added buttons to navigate throw the last and next seven days

# Some comments

- I moved the request of shipments to App.tsx to the data be global (The data could be added to a Reducer if we would need it in different places od the system)
- I didn't implement tests for this case to save time, but it would be just some small tests mocking the data and verifing if everything was loaded correclty.
- I've created some constants inside of the file of the components, if we'd need the value of these constants in different places, it was better to move these constants to a global file.

# How to run

Clone the project into your computer, access the folder of the clonned repository in your terminal and execute `npm install` or `yarn` to install all the packages, than execute `yarn start`.

# ;D

<img width="200" src="https://media.giphy.com/media/aNqEFrYVnsS52/giphy.gif" />
