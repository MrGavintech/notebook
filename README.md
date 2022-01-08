# Notebook

This app uses Session storage to store user notes. It uses angular material for a simple layout, and simple state management using basic RxJS w/out the use of any 3rd party state managers. This was a quick project I did for an interview requirement. The primary requirement was to allow note taking on the initial page that displayed. Also, the requirement said it shouldn't duplicate the users notes upon navigation to the same app in a new tab, or lose data in any tab session for refreshes. It was limited to 5 notes.

## Example in-app-usage

Watch a [Video](https://drive.google.com/file/d/1pR4df6OglP1i4YFOMSz3P-arZLrgMXOv/view?usp=sharing) on the basic usage

## What could be better and worked as issue requests?
The project was timed, so I always feel like there's room for improvement on a timed exercise. These are the following items I'd like to address in the code base
* More robust state manager such as redux or simpler like Dan's observable store
* Add unit tests with JEST or similar
* Change UI theme and add a more robust UX for note-taking


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.

## Example in-app-usage

Watch a [Video](https://drive.google.com/file/d/1pR4df6OglP1i4YFOMSz3P-arZLrgMXOv/view?usp=sharing) on the basic usage
