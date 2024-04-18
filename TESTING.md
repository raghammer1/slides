# HOW TO RUN TESTING:

# step 1

Start Your Application: Ensure it's served with instrumentation by running:
npm start

# step 2

Open or Run Cypress:
To interactively open Cypress:
npm run cypress:open

# step 3

Or to run Cypress tests headlessly:
npm run cypress:run

# step 4

Generate the Coverage Report
After tests complete, generate your coverage report:
npm run test:coverage

# END HOW TO RUN TESTING

# Beautiful testing Route 2:

1. User goes to register page and registers
2. User creates 2 new presentations in the dashboard
3. User opens and deletes the first presentation for testing
4. User opens the second presentation and adds 4 new slides on the presentation
5. User randomly goes to different slides
6. User creates a text box and moves it on the slide
7. User then adds a new image using url functionality and then moves it
8. User now adds a new video on the slide and sets auto-play true
9. User then goes to a different slide and adds some python code
10. User again goes to a different slide and adds some js code
11. User logs out and then logs back in
12. Everything is loading fine as it was saved in the DB
13. User opens the presentation 2 again and adds 4 more slides
14. User now moves between slides using arrow click on the screen
15. User then adds another image in the presentation and deletes it using right click
16. User then deletes all the slides hence deleting the presentation
17. User back on the dashboard

# COMMENTS FOR COMPONENT TESTING
