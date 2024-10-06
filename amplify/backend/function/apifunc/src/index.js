// import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
//const bcrypt = require('bcryptjs');
//const db = require('../../../config/firebase');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    try {
        // Parse the incoming request body
        const { firstName, lastName, email, password } = JSON.parse(event.body);
    
       // const hashedPassword = await bcrypt.hash(password, 10);

        let userData = {
            firstName,
            lastName,
            email,
            password,
        };

//        const users = collection(db, 'users');
  //      const userDoc = doc(users, email);
    //    const userSnapshot = await getDoc(userDoc);

//        if(userSnapshot.exists()) {
  //          return {
    //            statusCode: 400,
      //          headers: {
        //            'Access-Control-Allow-Origin': '*',
          //          'Access-Control-Allow-Headers': 'Content-Type',
            //        'Access-Control-Allow-Methods': 'POST,OPTIONS',
              //  },
                //body: JSON.stringify({ error: 'User already exists' }),
            //};
        //}

       // await setDoc(userDoc, userData);
        
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST,OPTIONS',
            },
            body: JSON.stringify({ message: 'Signup successful'}),
        };
    } catch (error) {
        console.error('Error processing request:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST,OPTIONS',
            },
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
