// Duration of the splash screen in milliseconds
const splashDuration = 3000;

// Hide the splash screen and show the main content after the duration
setTimeout(() => {
  document.querySelector('.splash-screen').style.opacity = 0;
  setTimeout(() => {
    document.querySelector('.splash-screen').style.display = 'none';
    document.querySelector('.main-content').style.display = 'block';
    document.querySelector('.main-content').style.opacity = 1;
  }, 1000);
}, splashDuration);