// import {hideLoading, showAlert, showLoading} from '../actions/AppAction';
// import firestore from '@react-native-firebase/firestore';

// export const AppMiddleware = {
//   getUserIncome: () => {
//     return dispatch => {
//       dispatch(showLoading());
//       return new Promise(async (resolve, reject) => {
//         try {
//           const usersCollectionRef = firestore().collection('Users');
//           dispatch(showLoading());
//           const userDoc = await usersCollectionRef.doc(user?.uid).get();
//           if (userDoc.exists) {
//             const userData = userDoc.data();
//             const incomeArray = userData || [];
//             console.log('User data array:', incomeArray);
//             // setmyincomes(incomeArray);
//           } else {
//             console.log('User document not found');
//             return [];
//           }
//         } catch (error) {
//           reject(error);
//           console.log(error);
//           dispatch(showAlert('Something went wrong'));
//         } finally {
//           dispatch(hideLoading());
//         }
//       });
//     };
//   },
// };
