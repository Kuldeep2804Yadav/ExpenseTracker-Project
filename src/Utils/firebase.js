import firebase from "firebase/compat/app";
import 'firebase/compat/database';


const firebaseConfig = {
 
  databaseURL: "https://expanse-tracker-50dd1-default-rtdb.firebaseio.com/",
  projectId: "expanse-tracker-50dd1",
  appId: "AIzaSyAALviDexVj08E56WEoeWX2oCtKXno-d1k",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();
export default database;
