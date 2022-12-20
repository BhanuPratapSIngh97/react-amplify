

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 var aws = require('aws-sdk');
 var ddb = new aws.DynamoDB();
 const tableName = process.env.UserTable;
 
 exports.handler = async (event, context ) => {
     let date = new Date();
 
     console.log(event,"event.requestevent.requestevent.request")
 
     if (event.request.userAttributes.sub) {
 
        var firstName = {S: 'firstName'}
        var lastName = {S: 'lastName'}
        var email = {S: 'xyz@yopmail.com'}
        var countryCode = {S: '+91'}
        var mobileNumber = {S: '0000000000'}
        var userType = {S: 'USER'}
        var loginType = {S: 'NORMAL'}
        var password = {S: 'xxxxxxxxxxxxxx'}

        if (event.request.userAttributes['custom:firstName']) {
            firstName = {S: event.request.userAttributes['custom:firstName']};
        }
        if (event.request.userAttributes['custom:lastName']) {
            lastName = {S: event.request.userAttributes['custom:lastName']};
        }
        if (event.request.userAttributes['email']) {
            email = {S: event.request.userAttributes['email']};
        }
        if (event.request.userAttributes['custom:countryCode']) {
            countryCode = {S: event.request.userAttributes['custom:countryCode']};
        }
        if (event.request.userAttributes['custom:mobileNumber']) {
            mobileNumber = {S: event.request.userAttributes['custom:mobileNumber']};
        }
        if (event.request.userAttributes['custom:userType']) {
            userType = {S: event.request.userAttributes['custom:userType']};
        }
        if (event.request.userAttributes['custom:loginType']) {
            loginType = {S: event.request.userAttributes['custom:loginType']};
        }
        if (event.request.userAttributes['custom:password']) {
            password = {S: event.request.userAttributes['custom:password']};
        }


         let params = {
             Item: {
                 'id': { S: event.request.userAttributes.sub },
                 'cognitoId': {S: event.request.userAttributes.sub},
                 'firstName': firstName,
                 'lastName': lastName,
                 'email': email,
                 'countryCode': countryCode,
                 'mobileNumber': mobileNumber,
                 'userType' : userType,
                 'loginType' : loginType,
                 'password': password,
                 'createdAt': { S: date.toISOString() },
                 'updatedAt': { S: date.toISOString() },
             },
             // TableName: process.env.API_{YOUR_APP_NAME}_USERTABLE_NAME
             TableName: tableName
         };
         try {
             await ddb.putItem(params).promise()
             console.log("Success");
         } catch (err) {
             console.log("Error", err);
         }
         console.log("Success: Everything executed correctly");
         context.done(null, event);
     }
     else {
         // Nothing to do, the user's email ID is unknown
         console.log("Error: Nothing was written to DynamoDB");
         context.done(null, event);
     }
 };
 