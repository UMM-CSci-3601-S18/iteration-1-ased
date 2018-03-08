package umm3601.goal;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;
import org.bson.codecs.*;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.json.JsonReader;
import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;
import umm3601.goal.GoalController;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

/**
 * JUnit tests for the GoalController.
 *
 * Created by mcphee on 22/2/17.
 */
public class GoalControllerSpec
{
    private GoalController goalController;
    private ObjectId cookId;
    @Before
    public void clearAndPopulateDB() throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("test");
        MongoCollection<Document> goalDocuments = db.getCollection("goals");
        goalDocuments.drop();
        List<Document> testGoals = new ArrayList<>();
        testGoals.add(Document.parse("{\n" +
                "                    title: \"Reading assig.\",\n" +
                "                    time: \"2 PM\",\n" +
                "                    description: \"History\",\n" +
                "                }"));
        testGoals.add(Document.parse("{\n" +
                "                    title: \"laundry\",\n" +
                "                    time: \" 2PM\",\n" +
                "                    description: \"gym clothes\",\n" +
                "                }"));
        testGoals.add(Document.parse("{\n" +
                "                    title: \"do the dishes\",\n" +
                "                    time: \"3 PM\",\n" +
                "                    description: \"minutes, Inc.\",\n" +
                "                }"));

        cookId = new ObjectId();
        BasicDBObject sam = new BasicDBObject("_id", cookId);
        sam = sam.append("title", "cook")
                .append("time", "1 PM")
                .append("description", "Food for lunch");




        goalDocuments.insertMany(testGoals);
        goalDocuments.insertOne(Document.parse(sam.toJson()));

        // It might be important to construct this _after_ the DB is set up
        // in case there are bits in the constructor that care about the state
        // of the database.
        goalController = new GoalController(db);
    }

    // http://stackoverflow.com/questions/34436952/json-parse-equivalent-in-mongo-driver-3-x-for-java
    private BsonArray parseJsonArray(String json) {
        final CodecRegistry codecRegistry
                = CodecRegistries.fromProviders(Arrays.asList(
                new ValueCodecProvider(),
                new BsonValueCodecProvider(),
                new DocumentCodecProvider()));

        JsonReader reader = new JsonReader(json);
        BsonArrayCodec arrayReader = new BsonArrayCodec(codecRegistry);

        return arrayReader.decode(reader, DecoderContext.builder().build());
    }

    private static String getName(BsonValue val) {
        BsonDocument doc = val.asDocument();
        return ((BsonString) doc.get("title")).getValue();
    }

    @Test
    public void getAllGoals() {
        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = goalController.getGoals(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 4 goals", 4, docs.size());
        List<String> title = docs
                .stream()
                .map(GoalControllerSpec::getName)
                .sorted()
                .collect(Collectors.toList());
        List<String> expectedTitles = Arrays.asList("Reading assig.", "cook", "do the dishes", "laundry");
       assertEquals("Title should match", expectedTitles, title);
    }



    @Test
    public void getCookById() {
        String jsonResult = goalController.getGoal(cookId.toHexString());
        Document cook = Document.parse(jsonResult);
        assertEquals("Title should match", "cook", cook.get("title"));
        String noJsonResult = goalController.getGoal(new ObjectId().toString());
        assertNull("No title should match",noJsonResult);

    }

    @Test
    public void addGoalTest(){
        String newId = goalController.addNewGoal("call Mom","before dinner","talk to her about the house");

        assertNotNull("Add new goal should return true when goal is added,", newId);
        Map<String, String[]> argMap = new HashMap<>();
        argMap.put("time", new String[] { "before dinner" });
        String jsonResult = goalController.getGoals(argMap);
        BsonArray docs = parseJsonArray(jsonResult);

        List<String> name = docs
            .stream()
            .map(GoalControllerSpec::getName)
            .sorted()
            .collect(Collectors.toList());
        assertEquals("Should return title of new goal", "call Mom", name.get(0));
    }





}
