package umm3601.goal;

import com.mongodb.BasicDBObject;
import com.mongodb.util.JSON;
import org.bson.types.ObjectId;
import spark.Request;
import spark.Response;

/**
 * Created by Brian on 11/29/2017.
 */
public class GoalRequestHandler {

    private final GoalController goalController;
    public GoalRequestHandler(GoalController goalController){
        this.goalController = goalController;
    }
    /**Method called from Server when the 'api/goals/:id' endpoint is received.
     * Get a JSON response with a list of all the goals in the database.
     *
     * @param req the HTTP request
     * @param res the HTTP response
     * @return one goal in JSON formatted string and if it fails it will return text with a different HTTP status code
     */
    public String getGoalJSON(Request req, Response res){
        res.type("application/json");
        String id = req.params("id");
        String goal;
        try {
            goal = goalController.getGoal(id);
        } catch (IllegalArgumentException e) {
            // This is thrown if the ID doesn't have the appropriate
            // form for a Mongo Object ID.
            // https://docs.mongodb.com/manual/reference/method/ObjectId/
            res.status(400);
            res.body("The requested goal id " + id + " wasn't a legal Mongo Object ID.\n" +
                "See 'https://docs.mongodb.com/manual/reference/method/ObjectId/' for more info.");
            return "";
        }
        if (goal != null) {
            return goal;
        } else {
            res.status(404);
            res.body("The requested goal with id " + id + " was not found");
            return "";
        }
    }



    /**Method called from Server when the 'api/goals' endpoint is received.
     * This handles the request received and the response
     * that will be sent back.
     *@param req the HTTP request
     * @param res the HTTP response
     * @return an array of goals in JSON formatted String
     */
    public String getGoals(Request req, Response res)
    {
        res.type("application/json");
        return goalController.getGoals(req.queryMap().toMap());
    }


    /**Method called from Server when the 'api/goals/new'endpoint is recieved.
     * Gets specified goal info from request and calls addNewGoal helper method
     * to append that info to a document
     *
     * @param req the HTTP request
     * @param res the HTTP response
     * @return a boolean as whether the goal was added successfully or not
     */
    public String addNewGoal(Request req, Response res)
    {

        res.type("application/json");
        Object o = JSON.parse(req.body());
        try {
            if(o.getClass().equals(BasicDBObject.class))
            {
                try {
                    BasicDBObject dbO = (BasicDBObject) o;

                    String title = dbO.getString("title");
                    //For some reason age is a string right now, caused by angular.
                    //This is a problem and should not be this way but here ya go
                    String time = dbO.getString("time");
                    String description = dbO.getString("description");


                    System.err.println("Adding new goal [title=" + title + ", time=" + time + " description=" + description +  ']');
                    return goalController.addNewGoal(title, time, description).toString();
                }
                catch(NullPointerException e)
                {
                    System.err.println("A value was malformed or omitted, new goal request failed.");
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
