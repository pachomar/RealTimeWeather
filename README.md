Setting Up Application
=====================================================================================================================================
Extract the zip file directly, the folder structure will be ready for the application to run.
To start the application, open VSCode or any environment that runs terminal commands. The startup folder is RealTimeWeather\realtime-weather
Install NodeJS if not installed already, then run the following commands:

npm run install
json-server --watch db.json --port 3001
npm run start

The application should be up and running by now

Considerations
=====================================================================================================================================
- The 5 last searches appear on the grid. Used the library json-server to store each search in db.json
- All events will be sorted by date descending
- If a new event is created, the screen will reload and put the corresponding ones in the top 5
- If the API doesn't find the city searched, then nothing happens but show a error message