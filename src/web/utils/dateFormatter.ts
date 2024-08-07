export function dateFormatter(inputDate: Date, format: string) {
    let year = inputDate.getFullYear();
    let month = String(inputDate.getMonth() + 1).padStart(2, '0');
    let day = String(inputDate.getDate()).padStart(2, '0');
    let hours = String(inputDate.getHours()).padStart(2, '0');
    let minutes = String(inputDate.getMinutes()).padStart(2, '0');
    let seconds = String(inputDate.getSeconds()).padStart(2, '0');
    switch(format){
        case 'formattedDateWithT': {
            let formattedDateWithT = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
            return formattedDateWithT;
        }
        case 'formattedDateWithoutT': {
            let formattedDateWithoutT = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
            return formattedDateWithoutT;
        }
        case 'formattedDateOnly': {
            let formattedDateOnly = `${day}/${month}/${year}`;
            return formattedDateOnly;
        }
        default: return;
    }
}

export function formatDateToWeek(dateString: string): string {
  
    const currentDate = new Date();
    const transactionDate = new Date(dateString);
  
    const millisecondsDiff = currentDate.getTime() - transactionDate.getTime();
    const daysDiff = millisecondsDiff / (1000 * 60 * 60 * 24);
  
    if (daysDiff < 1) {
      // The transaction occurred today
      const hours = transactionDate.getHours();
      const minutes = transactionDate.getMinutes();
      return `Hoy ${formatNumber(twoDigits(hours))}:${formatNumber(twoDigits(minutes))}`;
    } else if (daysDiff < 2) {
      // The transaction occurred yesterday
      const hours = transactionDate.getHours();
      const minutes = transactionDate.getMinutes();
      return `Ayer ${formatNumber(twoDigits(hours))}:${formatNumber(twoDigits(minutes))}`;
    } else {
      // The transaction occurred more than a day ago
      const day = transactionDate.getDate();
      const month = transactionDate.getMonth() + 1;
      const year = transactionDate.getFullYear();
      const hours = transactionDate.getHours();
      const minutes = transactionDate.getMinutes();
      return `${formatNumber(twoDigits(day))}/${formatNumber(twoDigits(month))}/${year} ${formatNumber(twoDigits(hours))}:${formatNumber(twoDigits(minutes))}`;
    }
  }
  
  function twoDigits(number: number): string {
    return number < 10 ? `0${number}` : number.toString();
  }
  
  function formatNumber(number: number | string): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }  
  
