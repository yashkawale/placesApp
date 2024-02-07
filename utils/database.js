import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("places.db", "v1");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL 
            )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

// export const insertPlace = (place) => {
//   const promise = new Promise((resolve, reject) => {
//     database.transaction((tx) => {
//       tx.executeSql(
//         `INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)`
//       ),
//         [
//           place.title,
//           place.imageUri,
//           place.location.address,
//           place.location.latitude,
//           place.location.longitude,
//         ],
//         (_, result) => {
//           console.log(result);
//           resolve(result);
//         },
//         (_, error) => {
//           console.log(error);
//           reject(error);
//         };
//     });
//   });

//   return promise;
// };

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.location.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          console.log("Error executing SQL query:", error);
          reject(error);
        }
      );
    });
  });

  return promise;
}
