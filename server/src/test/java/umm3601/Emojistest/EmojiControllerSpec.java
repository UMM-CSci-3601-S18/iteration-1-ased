package umm3601.Emojistest;

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
import umm3601.Emojis.EmojiController;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

/**
 * JUnit tests for the UserController.
 *Assert.*;
 * Created by mcphee on 22/2/17.
 */
public class EmojiControllerSpec
{
    private EmojiController emojiController;
    private ObjectId sungjaesId;

    @Before
    public void clearAndPopulateDB() throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("");
        MongoCollection<Document> userDocuments = db.getCollection("users");
        userDocuments.drop();
        List<Document> testUsers = new ArrayList<>();
        testUsers.add(Document.parse("{\n" +
            "                    _id: \"Chris\",\n" +
            "                    user: \"Chris\",\n" +
            "                    value: \"Happy\",\n" +
            "                    time_stamp: \"9/10/2017 13:00\"\n" +
            "                }"));
        testUsers.add(Document.parse("{\n" +
            "                    _id: \"Pat\",\n" +
            "                    user: \"Pat\",\n" +
            "                    value: \"Sad\",\n" +
            "                    time_stamp: \"6/20/2014 16:00\"\n" +
            "                }"));
        testUsers.add(Document.parse("{\n" +
            "                    _id: \"Jamie\",\n" +
            "                    user: \"Jamie\",\n" +
            "                    value: \"Angry\",\n" +
            "                    time_stamp: \"1/20/2018 20:00\"\n" +
            "                }"));

        sungjaesId = new ObjectId();
        BasicDBObject sungjae = new BasicDBObject("_id", sungjaesId);
        sungjae = sungjae.append("user", "Sungjae")
            .append("value", "Sad")
            .append("time_stamp", "3/05/2018 22:16");



        userDocuments.insertMany(testUsers);
        userDocuments.insertOne(Document.parse(sungjae.toJson()));

        // It might be important to construct this _after_ the DB is set up
        // in case there are bits in the constructor that care about the state
        // of the database.
        emojiController = new EmojiController(db);
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

    private static String getUsers(BsonValue val) {
        BsonDocument doc = val.asDocument();
        return ((BsonString) doc.get("user")).getValue();
    }

    @Test
    public void getAllEmojis() {
        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = emojiController.getEmojis(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 4 users", 4, docs.size());
        List<String> names = docs
            .stream()
            .map(EmojiControllerSpec::getUsers)
            .sorted()
            .collect(Collectors.toList());
        List<String> expectedNames = Arrays.asList("Chris", "Jamie", "Pat", "Sungjae");
        assertEquals("Names should match", expectedNames, names);
    }

    @Test
    public void getEmojisByUser() {
        Map<String, String[]> argMap = new HashMap<>();
        argMap.put("user", new String[] { "Chris" });
        String jsonResult = emojiController.getEmojis(argMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be shows Happy Emojis", 1, docs.size());
        List<String> names = docs
            .stream()
            .map(EmojiControllerSpec::getUsers)
            .sorted()
            .collect(Collectors.toList());
        List<String> expectedNames = Arrays.asList("Chris");
        assertEquals("Names should match", expectedNames, names);
    }

    @Test
    public void getSamById() {
        String jsonResult = emojiController.getEmoji(sungjaesId.toHexString());
        Document sungjae = Document.parse(jsonResult);
        assertEquals("Name should match", "Sungjae", sungjae.get("user"));
        String noJsonResult = emojiController.getEmoji(new ObjectId().toString());
        assertNull("No name should match",noJsonResult);

    }

    @Test
    public void addEmojiTest(){
        String newId = emojiController.addNewEmoji("ethan","Ethan","Sad","3/03/2018 22:30");

        assertNotNull("Add new user should return true when user is added,", newId);
        Map<String, String[]> argMap = new HashMap<>();
        argMap.put("Ethan", new String[] { "Ethan" });
        String jsonResult = emojiController.getEmojis(argMap);
        BsonArray docs = parseJsonArray(jsonResult);

        List<String> name = docs
            .stream()
            .map(EmojiControllerSpec::getUsers)
            .sorted()
            .collect(Collectors.toList());
        assertEquals("Should return name of new user", "Ethan", name.get(4));
    }


}
