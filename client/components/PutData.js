import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

const saveMessage = async (field, data, utility) => {
  const key = `message_${Date.now()}`;
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify({ field, data, utility }),
    'secret-key'
  ).toString();

  await AsyncStorage.setItem(key, encryptedData);
};

const addSampleData = async () => {
  const sampleData = [
    { field: "personal", data: "Dinner at 7 PM", utility: "reminder" },
    { field: "work", data: "Meeting with client", utility: "calendar" },
    { field: "personal", data: "Call mom", utility: "reminder" },
    { field: "utility", data: "Electricity bill", utility: "bill" },
    { field: "work", data: "Submit report", utility: "task" },
    { field: "utility", data: "Water bill", utility: "bill" },
    { field: "personal", data: "Book tickets", utility: "reminder" },
    { field: "work", data: "Team lunch", utility: "event" },
    { field: "utility", data: "Internet bill", utility: "bill" },
    { field: "personal", data: "Buy groceries", utility: "shopping" },
    { field: "work", data: "Weekly review", utility: "meeting" },
    { field: "utility", data: "Phone recharge", utility: "bill" },
    { field: "personal", data: "Visit doctor", utility: "appointment" },
    { field: "work", data: "Client presentation", utility: "meeting" },
    { field: "utility", data: "Gas bill", utility: "bill" },
    { field: "personal", data: "Yoga session", utility: "fitness" },
    { field: "work", data: "Office party", utility: "event" },
    { field: "utility", data: "House rent", utility: "payment" },
    { field: "personal", data: "Renew insurance", utility: "reminder" },
    { field: "work", data: "Plan project", utility: "task" },
  ];

  for (const item of sampleData) {
    console.log(item)
    await saveMessage(item.field, item.data, item.utility);
  }

  console.log('20 sample messages added to AsyncStorage.');
};

export default addSampleData;
