import moment from 'moment';

export const formatDateTime = (date: Date) => {
  return moment(date).format('L h:mm a');
};

export const formatDate = (date: Date) => {
  return moment(date).format('DD MMM');
};

export const formatTime=(date:Date)=>{
  return moment(date).format('hh:mm a');
}