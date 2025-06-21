export const formatDate = (dateValue, needTime = false) => {
  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return dateValue;

    const dateOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    const datePart = date.toLocaleDateString("en-US", dateOptions);

    if (!needTime) return datePart;

    const timePart = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${datePart}, ${timePart}`;
  } catch (error) {
    return dateValue;
  }
};
