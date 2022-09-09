<img width="300" src="https://logixboard.com/wp-content/uploads/2022/07/logo-dark.svg" />

# Access on Vercel
https://logixboard.vercel.app/dashboard

# Challenge

- Fixed ShipmentsPage height to do not scroll and limit items per page
- Created page to view shipments arriving of the next seven days
- Added buttons to navigate throw the last and next seven days

# Some comments

- I moved the request of shipments to App.tsx to the data be global (The data could be added to a Reducer if we would need it in different places od the system)
- I didn't implement tests for this case to use my time to develop the solution in the time you proposed, but it would be just some small tests mocking the data and verifing if everything was loaded correclty
- I've created some constants inside of the file of the components, if we'd need the value of these constants in different places, it was better to move these constants to a global file.

![image](https://user-images.githubusercontent.com/8795657/189435735-cc4778f7-1b06-4552-9f1b-0f9df4696765.png)


# How to run

Clone the project into your computer, access the folder of the clonned repository in your terminal and execute `npm install` or `yarn` to install all the packages, than execute `yarn start`.

# ;D

<img width="200" src="https://media.giphy.com/media/aNqEFrYVnsS52/giphy.gif" />
