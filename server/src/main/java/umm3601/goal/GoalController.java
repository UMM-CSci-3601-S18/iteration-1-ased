package umm3601.goal;

import com.google.gson.Gson;
import com.mongodb.*;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;
import java.util.Iterator;
import java.util.Map;

import static com.mongodb.client.model.Filters.eq;

/**
 * Controller that manages requests for info about goals.
 */
public class GoalController {

    private final Gson gson;
    private MongoDatabase database;
    private final MongoCollection<Document> goalCollection;

    /**
     * Construct a controller for goals.
     *
     * @param database the database containing goal data
     */
    public GoalController(MongoDatabase database) {
        gson = new Gson();
        this.database = database;
        goalCollection = database.getCollection("goals");
    }

    /**
     * Helper method that gets a single goal specified by the `id`
     * parameter in the request.
     *
     * @param id the Mongo ID of the desired goal
     * @return the desired goal as a JSON object if the goal with that ID is found,
     * and `null` if no goal with that ID is found
     */
    public String getGoal(String id) {
        FindIterable<Document> jsonGoals
            = goalCollection
            .find(eq("_id", new ObjectId(id)));

        Iterator<Document> iterator = jsonGoals.iterator();
        if (iterator.hasNext()) {
            Document goal = iterator.next();
            return goal.toJson();
        } else {
            // We didn't find the desired goal
            return null;
        }
    }


    /** Helper method which iterates through the collection, receiving all
     * documents if no query parameter is specified. If the age query parameter
     * is specified, then the collection is filtered so only documents of that
     * specified age are found.
     *
     * @param queryParams
     * @return an array of Goals in a JSON formatted string
     */
    public String getGoals(Map<String, String[]> queryParams) {

        Document filterDoc = new Document();

        if (queryParams.containsKey("time")) {
            String targetContent = (queryParams.get("time")[0]);
            Document contentRegQuery = new Document();
            contentRegQuery.append("$regex", targetContent);
            contentRegQuery.append("$options", "i");
            filterDoc = filterDoc.append("time", contentRegQuery);
        }

        if (queryParams.containsKey("description")) {
            String targetContent = (queryParams.get("description")[0]);
            Document contentRegQuery = new Document();
            contentRegQuery.append("$regex", targetContent);
            contentRegQuery.append("$options", "i");
            filterDoc = filterDoc.append("description", contentRegQuery);
        }

        //FindIterable comes from mongo, Document comes from Gson
        FindIterable<Document> matchingGoals = goalCollection.find(filterDoc);

        return JSON.serialize(matchingGoals);
    }


    /**
     * Helper method which appends received goal information to the to-be added document
     *
     * @param title
     * @param time
     * @param description
     * @return boolean after successfully or unsuccessfully adding a goal
     */
    public String addNewGoal(String title, String time, String description) {

        Document newGoal = new Document();
        newGoal.append("title", title);
        newGoal.append("time", time);
        newGoal.append("description", description);


        try {
            goalCollection.insertOne(newGoal);
            ObjectId id = newGoal.getObjectId("_id");
            System.err.println("Successfully added new goal [_id=" + id + ", time=" + title + ", time=" + time + " description=" + description + ']');
            // return JSON.serialize(newGoal);
            return JSON.serialize(id);
        } catch(MongoException me) {
            me.printStackTrace();
            return null;
        }
    }
}
