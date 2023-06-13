export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years ago";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    if (interval < 2) return interval + " days ago";
    else return new Date(date).toLocaleDateString();
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }

  if (seconds < 10) return "just now";

  return Math.floor(seconds) + " seconds ago";
};

export function formatDate(dateString) {
  // Split the date string into an array using "/" as the separator
  //const parts = dateString.split("/");

  // Create a new Date object using the parts of the date string in the "mm/dd/yyyy" format
  const date = new Date(dateString);

  // Get the day, month, and year values from the date object and convert them to strings
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  // Return the formatted date string in the "dd/mm/yyyy" format
  return `${day}/${month}/${year}`;
}
