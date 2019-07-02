**Build instructions:**

1) Clone the project locally using the git clone command:
git clone https://github.com/averjee/venue-decider.git

2) Create a local server within the cloned directory by running:
http-server

3) Run the project locally using the generated localhost:
http://127.0.0.1:8080/

**Test instructions:**

I’ve created a test case scenario using Jest and Puppeteer which will automatically load the chromium browser and run through a test scenario which will select John Doe and Emily Pratt and submit the names which will then also check whether the places to go and places to avoid are outputted properly together with reasons for the places to avoid.  The test scenario code is within util.test.js. and the command line window should show that the test case scenario passed.

In order to perform this testing scenario please run the following in the build directory whilst ensuring you are still connected to your localhost:

1) npm install jest
2) npm install puppeteer
3) npm test
