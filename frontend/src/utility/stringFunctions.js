// this is necessary for formality in the UI
export function title(str) {
  if (typeof str !== 'string') return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// get the device's local date
export function getDate(){
  const now = new Date

  const date = now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return date
}

// get the device's local time
export function getTime(){
  const now = new Date

  const time = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });

  return time
}