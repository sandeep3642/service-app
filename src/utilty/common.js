  // Format date to "Feb 18, 2025" format
   export const formatDate = (dateValue) => {
        try {
            const date = new Date(dateValue);
            if (isNaN(date.getTime())) return dateValue; // Return original if invalid date
            
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (error) {
            return dateValue; // Return original value if formatting fails
        }
    };