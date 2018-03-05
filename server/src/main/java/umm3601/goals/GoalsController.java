package umm3601.goals;

import com.google.gson.Gson;
import com.mongodb.*;
import com.mongodb.client.DistinctIterable;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import static com.mongodb.client.model.Filters.eq;

public class GoalsController {

    private final Gson gson;
    private MongoDatabase database;
    private final MongoCollection<Document> goalsCollection;

    public GoalsController(MongoDatabase database) {
        gson = new Gson();
        this.database = database;
        goalsCollection = database.getCollection("goals");
    }

    public String getGoals(Map<String, String[]> queryParams) {
        Document filterDoc = new Document();

        FindIterable<Document> matchingGoals = goalsCollection.find(filterDoc);
        return JSON.serialize(matchingGoals);
    }

    public String getGoal(String id) {
        FindIterable<Document> jsonGoals = goalsCollection.find(eq("_id", new ObjectId(id)));

        Iterator<Document> iterator = jsonGoals.iterator();
        if (iterator.hasNext()) {
            Document goal = iterator.next();
            return goal.toJson();
        } else {
            return null;
        }
    }

}
