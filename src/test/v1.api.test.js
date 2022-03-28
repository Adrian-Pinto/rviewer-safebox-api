// Testing v1 endpoints

//  Given: POST call on /v1/safebox
//    When: Request body includes name: String
//      * : Request body includes password: String
//      Then: Response status 200
//        * : JSON with key id: String
//    When: Request body includes existing sadebox name
//      Then: Response status 409
//        * : Response text 'Safebox already exists'
//    When: Request body missing name or password
//      Then: Response status 422
//        * : Response text 'Malformed expected data'
//    When: Request missing endpoint
//      Then: Response status 404
//        * : Response text 'Unexpected API error'
//    When: Occurs an unknown API error
//      Then: Response status 500
//        * : Response text 'Unexpected API error'

//  Given: GET call on /v1/safebox/{id}/open
//    When: Safebox id exist
//      * : Auth header is correct
//      Then: Response status 200
//        * : JSON with key token: String
//    When: Safebox id not exist
//      Then: Response status 404
//        * : Response text 'Requested safebox does not exist'
//    When: Safebox id exist
//     But: Auth header is missing
//      Then: Response status 422
//        * : Response text 'Malformed expected data'
//    When: Safebox id exist
//      * : Safebox is locked
//      Then: Response status 423
//        * : Response text 'Requested safebox is locked'
//    When: Occurs an unknown API error
//      Then: Response status 500
//        * : Response text 'Unexpectted API error'

//  Given: GET call on /v1/safebox/{id}/items
//    When: Safebox id exist
//      * : Auth token is correct
//      Then: Response status 200
//        * : Response JSON with items Array
//    When: Safebox id exist
//     But: Auth token is not valid
//      Then: Response status 401
//        * : Response text 'Specified token does not match'
//    When: Safebox id not exist
//      Then: Response status 404
//        * : Response text 'Requested safebox does not exist'
//    When: Safebox exist
//     But: Auth header is missing
//      Then: Response status 422
//        * : Response text 'Malformed expected data'
//    When: Safebox id exist
//     But: Safebox is locked
//      Then: Response status 423
//        * : Response text 'Requested safebox is locked'
//    When: Occurs an unknown API error
//      Then: Response status 500
//        * : Response text 'Unexpected API error'

//  Given: PUT call on /v1/safebox/{id}/items
//    When: Safebox id exist
//      * : Auth header token is valid
//      * : Request body is a valid items Array
//      Then: Response status 200
//        * : Response text 'Content correctly added to the safebox'
//    When: Safebox id exist
//     But: Auth header is not valid
//      Then: Response status 401
//        * : Response text 'Specified token does not match'
//    When: Safebox id not exist
//      Then: Response status 404
//        * : Response text 'Requested safebox does not exist'
//    When: Safebox id exist
//     But: Request body is not a valid items Array
//      Then: Response status 422
//        * : Response text 'Malformed expected data'
//    When: Safebox id exist
//     But: Safebox is locked
//      Then: Response status 423
//        * : Response text 'Requested safebox is locked'
//    When: Occurs an unknown API error
//      Then: Response status 500
//        * : Response text 'Unexpected API error'
