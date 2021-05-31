

export const createTableId = (id) => `B${id}`;
export const getKeys = (keys) => Object.keys(keys);


export const sortUserDataSelector = (resp) => {
    return resp.sort((a,b) => {
        if(a.bookName < b.bookName) return -1;
        if(a.bookName > b.bookName) return 1;
        return 0;
      });
}

export const createTableUIDataSelector = (sortUserData) => {
    return sortUserData.map(item => {
        const {
          bookId = '',
          bookName = '',
          publisher = '',
          date: {
            issueDate = '',
            returnDate = ''
          } = {}
        } = item
        return {
          Id:createTableId(bookId),
          BookName:bookName,
          Publisher:publisher,
          "Issue Date": formatDate(issueDate),
          "Return Date": formatDate(returnDate),
          "Status":getStatus(issueDate,returnDate)
        }
      })
}

const getStatus = (issueDate,returnDate) => {
  let todayDate = getFullDate(new Date());
  let iDate = getFullDate(issueDate);
  let rDate = getFullDate(returnDate);
  // let add14 = 
  // if((todayDate.currentDate < rDate.currentDate) || (!issueDate && !returnDate)){
  //   return 'available';
  // }else if(!returnDate){

  // }
}

const getFullDate = (date = '') => {
    let todayDate = new Date(date);
    let currentDate = todayDate.getDate();
    let currentMonth = todayDate.getMonth();
    let currentYear = todayDate.getFullYear();
    return {
        currentDate,
        currentMonth,
        currentYear
    } 
}
export const formatDate = (date) => {
    if(!date) return '-'
    let todayDate = getFullDate(new Date());
    let userDate = getFullDate(date);

    if(todayDate.currentYear  === userDate.currentYear && todayDate.currentMonth  === userDate.currentMonth && todayDate.currentDate  === userDate.currentDate ){
       return 'Today';
    }else if(todayDate.currentYear  === userDate.currentYear && todayDate.currentMonth  === userDate.currentMonth){
        if(todayDate.currentDate === userDate.currentDate - 1){
            return 'yesterday';
        }else if(todayDate.currentDate === userDate.currentDate + 1){
            return 'Tomorrow'
        }
    }
    return `${userDate.currentDate}/${userDate.currentMonth}/${userDate.currentYear}`
}