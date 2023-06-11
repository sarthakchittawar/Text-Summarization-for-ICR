# DASS-2022-23-Team-46 - Summarisation of ICR System Responses

## Description

The intelligent caller response (ICR) is a multi-organization effort, to create a voice based smart response system capable of answering questions in Indian vernacular languages. The existing system architecture consists of an automated speech recognition (ASR) module, machine translation (ML) module, a semantic document search engine, and a text-to-speech (TTS) module. The larger project is currently under data collection and model adaptation phase.

The current effort is to develop a module to summarize the responses from the document search engine, to produce more “human friendly” responses. This will be limited to the use of existing summarisation engines and exploring input content requirements to output quality. The major development is on building the API wrappers to the chosen ML engines and a simple UI for the purposes of demonstration.

## Profile of Users

The UI developed is meant only for demonstrative purposes only, hence has one end-user with a specific use case - the dev team to demo to an audience. As such the user must be capable of using the system by providing input text and receiving output summarised text, through a clean self-explanative UI.

The backend API for the summarization module is however meant to be compatible for future incorporation to the larger ICR system, as such must be very well documented in terms of expected input & output, deployment instructions, and finally the choice and performance of ML model (to allow for future ML model adaptations).

## Feature highlights

The developed system requires the following features:

### Frontend/UI:

1. Enter input text.
2. Perform API calls.
3. Display output text.

### Backend/API:

1. Receive input text.
2. Run ML inference model to generate summarised text.
3. Send back output text.


## Usage Model and Diagrams (if any)

Fig. 1 shows the overall system architecture for ICR and how the current work is expected to fit in, and Fig. 2 shows a simple architecture of the current work.

![image](diagrams/fig.png)

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