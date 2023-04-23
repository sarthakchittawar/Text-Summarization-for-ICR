# Instructions to install & run the frontend-backend framework


### Preferably run the following on Windows

## Frontend:
Follow the instructions on [this link](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows#install-nvm-windows-nodejs-and-npm) to install nvm
In the ‘User Interface’ directory, then execute the command `npm i` to install all node_modules using the `package.json` file \

Execute the command `npm start` in the same file to start the frontend server at `http://localhost:3000`

## Backend (Flask):
The flask file `backend.py` uses the DistilBart text summarizer from `model.py`. \
Therefore we have to install the required modules in python using the following commands:
* Install the latest version of python and pip
* `pip install numpy`
* `pip install numba`
* `pip install transformers`
* For installing `pytorch`, run the appropriate command from filtering your specifications in https://pytorch.org/get-started/locally/
* `pip install flask`
* `pip install flask-cors`

#

On windows, we run the command `flask --app backend --debug run` and on linux we run the command `python backend.py` in the `User Interface` folder. \
Now, the backend server should be running at `http://localhost:5000`

To test the summarizer, go to `http://localhost:3000`, type your documented text and click on submit. \
Within 20 seconds, the summary will show up under the Output section in the webpage.
