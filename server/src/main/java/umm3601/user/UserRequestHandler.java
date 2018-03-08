/*package umm3601.user;

import com.mongodb.BasicDBObject;
import com.mongodb.util.JSON;
import org.bson.types.ObjectId;
import spark.Request;
import spark.Response;
*/
/**
 * Created by Brian on 11/29/2017.
 */

/*

public class UserRequestHandler {

    private final UserController userController;
    public UserRequestHandler(UserController userController){
        this.userController = userController;
    }

    public String getUserJSON(Request req, Response res){
        res.type("application/json");
        String id = req.params("id");
        String user;
        try {
            user = userController.getUser(id);
        } catch (IllegalArgumentException e) {
            // This is thrown if the ID doesn't have the appropriate
            // form for a Mongo Object ID.
            // https://docs.mongodb.com/manual/reference/method/ObjectId/
            res.status(400);
            res.body("The requested user id " + id + " wasn't a legal Mongo Object ID.\n" +
                "See 'https://docs.mongodb.com/manual/reference/method/ObjectId/' for more info.");
            return "";
        }
        if (user != null) {
            return user;
        } else {
            res.status(404);
            res.body("The requested user with id " + id + " was not found");
            return "";
        }
    }




    public String getUsers(Request req, Response res)
    {
        res.type("application/json");
        return userController.getUsers(req.queryMap().toMap());
    }


    */
/*
    public String addNewUser(Request req, Response res)
    {

        res.type("application/json");
        Object o = JSON.parse(req.body());
        try {
            if(o.getClass().equals(BasicDBObject.class))
            {
                try {
                    BasicDBObject dbO = (BasicDBObject) o;

                    String name = dbO.getString("name");
                    //For some reason age is a string right now, caused by angular.
                    //This is a problem and should not be this way but here ya go
                    int age = dbO.getInt("age");
                    String company = dbO.getString("company");
                    String email = dbO.getString("email");

                    System.err.println("Adding new user [name=" + name + ", age=" + age + " company=" + company + " email=" + email + ']');
                    return userController.addNewUser(name, age, company, email).toString();
                }
                catch(NullPointerException e)
                {
                    System.err.println("A value was malformed or omitted, new user request failed.");
                    return null;
                }

            }
            else
            {
                System.err.println("Expected BasicDBObject, received " + o.getClass());
                return null;
            }
        }
        catch(RuntimeException ree)
        {
            ree.printStackTrace();
            return null;
        }
    }
}

*/
