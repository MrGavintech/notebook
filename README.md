# Notebook
This app uses Session storage to store user notes. It uses angular material for a simple layout, and simple state management using basic RxJS w/out the use of any 3rd party state managers. This was a quick project I did for an interview requirement. The primary requirement was to allow note taking on the initial page that displayed. Also, the requirement said it shouldn't duplicate the users notes upon navigation to the same app in a new tab, or lose data in any tab on refreshes. It was limited to 5 notes.

## Example in-app-use
Watch a quick demo

[<img width="120" src="https://user-images.githubusercontent.com/36651921/148663476-80f28bdf-e639-4a52-ae82-d6ed9ba53f77.png">](https://drive.google.com/file/d/1pR4df6OglP1i4YFOMSz3P-arZLrgMXOv/view?usp=sharing)

#### Landing page
<img src="https://user-images.githubusercontent.com/36651921/148658239-48a53be7-ab7e-4ac0-9bdf-2683647314b1.png" alt="Screen Shot" width="600"/>

## What could be better and worked as issue requests?
The project was timed, so I always feel like there's room for improvement on a timed exercise. These are the following items I'd like to address in the code base
* More robust state manager such as redux or simpler like Dan's observable store
* Add unit tests with JEST or similar
* Change UI theme and add a more robust UX for note-taking


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.
