# backend


Endpoints


·Authentication
You will need to hit this endpoints to do anything in the API.

POST /api/auth/login 
    Takes "username" and "password" and logs in that user IF credentials are valid.
    Returns an authenticated message and also a token.
    example : 
    {
        username:"admin",
        password:"admin"
    }

POST /api/auth/register
    Takes "username" and "password"  and if username is not already in the database creates a new user with those credentials.
    Returns the newly created username, with the hashed password
    example :
    {
        username:"newAccount",
        password:"newAccount"
    }

PUT /api/auth/user
Takes "username" and "password"  and if username is not already in the database creates a new user with those credentials.
    Returns a succesful message.

·Song lists & song search

GET /api/songs/list/:ID
    Returns 10000 songs Objects in a JSON, if :id is left blank it will default to the first "page". It has a maximum of 12 pages. 
    !DISCLAIMER! This will probably change for production, depending on the results during stress test.

POST /api/songs/
    Takes an "id" that is an id of a song (not track_id like it was supposed to be).
    Returns an object of that song.
    example : 
    {
        id:"1981"
    }


·Liked songs

GET /api/songs/liked
    Returns the list of songs liked by the user.

POST /api/songs/liked
    Takes an "track_id" that is an id of a song (not track_id like it was supposed to be).
    Returns the list of songs liked by the user.
    example : 
    {
        track_id:"1981" //Where 1981 is the id of the song, not the track_id
    }
    
POST /api/songs/liked
    Takes an "track_id" that is an id of a song (not track_id like it was supposed to be).
    Returns a message displaying if the song could be deleted or not.
    example : 
    {
        track_id:"1981" //Where 1981 is the id of the song, not the track_id
    }












TODO (top takes priority)

[50] Basic api setup 
[75] Users table
[75] Authentication
[] Save Liked songs {standby}
[] Get Recommended songs (stanby)
[] Web deployment

[30] Dummy test
[25] Initial mockup, waiting for implementation
[50] Most features
[75] All features implemented, debugging/polishing
[100] Ready for production
