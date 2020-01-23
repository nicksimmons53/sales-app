import Firebase from '../../config/Firebase';

// Delete Client Info
const deleteInfo = async(client, loading, modal) => {
  // Save to New Location
  let clientRef = saveInfo(client, 'inactiveClients');

  // Client Programs
  // SAVE TO DIFFERENT FILE
  await Firebase.firestore( )
    .collection('clients')
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(client.uid)
    .collection('programs')
    .get( )
    .then((snapshot) => {
      snapshot.docs.forEach(function(doc) {
        clientRef.collection('programs').doc(doc.data( )[0].program).set(doc.data( ));
        doc.ref.delete( );
      });
    });

  // DELETE CLIENT
  Firebase.firestore( )
    .collection('clients')
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(client.uid)
    .delete( );

  // MOVE TO PARENT FOLDER
  modal( );
  loading( );
}

// Retrieves Client Info
const retrieveInfo = async(uid) => {
  let client = null;

  await Firebase.firestore( )
    .collection('clients')
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(uid)
    .get( )
    .then(function(doc) {
      client = doc.data( );
    });

  return client;
}

// Save Client Info
const saveInfo = async(values, collection, clientUID) => {
  const clientRef = Firebase.firestore( )
    .collection(collection)
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(clientUID);
  values.uid = clientRef.id;

  await clientRef.update(values);

  return clientRef;
}

// Update Client Info
const updateInfo = async(values, collection, client) => {
  const clientRef = Firebase.firestore( )
    .collection(collection)
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(client.uid);

  await clientRef.set(values, { merge: true });
}

// Retrieve All Clients
const retrieveAll = async(collection) => {
  let clients = [ ];

  await Firebase.firestore( )
    .collection(collection)
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .get( ).then(function(querySnap) {
      querySnap.forEach(function(doc) {
        clients.push(doc.data( ));
      });
    });

  return clients;
}

//
// Export All Client Functions
export var Client = {
  deleteInfo,
  retrieveInfo,
  saveInfo,
  updateInfo,
  retrieveAll
};