// Testing v0 endpoints

//  Given POST call on /v0/safebox

//    When Request header includes name: String
//     *   Request header includes password: String
//      Then Response code 200
//        *  Response description equal to "Safebox correctly created"
//        *   JSON with key id: String

//    When Request header includes existing safebox name
//      Then Response code 409
//        *  Response description 'Safebox already exists'

//    When Request header missing name or password
//      Then Response code 422
//        *  Response description 'Malformed expected data'

//    When Occurs an API error
//      Then Response code 500
//        *  Response description 'Unexpected API error'

//  Given GET call on /v0/safebox/{id}/items

//    When Safebox id exists
//      *  Password in Auth header is correct
//      Then Response code 200
//        *  Response description 'Safebox contents correctly retrieved'
//        *  Response JSON with array of stored items

//    When Safebox id exist
//     But Password in header is incorrect
//      Then Response code 401
//        *  Response description 'Specified Basic Auth does not match'

//    When Safebox id not exist
//      Then Response code 404
//        *  Response description 'Request safebox does not exist'

//    When Request header auth is missing
//      Then Response code 422
//        *  Response description 'Malformed expected data'

//    When Occurs an API error
//      Then Response code 500
//        *  Response description 'Unexpected API error'

//  Given PUT call on /v0/safebox/{id}/items

//    When Safebox id exist
//      *  Password in Auth header is correct
//      *  Request body is valid
//      Then Response code 200
//        *  Response description 'Content correctly added to the safebox'
//        *  Now in database {id}.items array have x more items

//    When Safebox id exists
//     But Password in Auth header is incorrect
//      Then Response code 401
//        *  Response description 'Specified Basic Auth does not match'

//    When Safebox id not exist
//      Then Response code 404
//        *  Response description 'Requested safebox does not exist'

//    When Safebox id exist
//      *  Password in Auth header is correct
//     But Request body is invalid
//      Then Response code 422
//        *  Response description 'Malformed expected data'

//    When Occurs an API error
//      Then Response code 500
//        *  Response description 'Unexpected API error'
