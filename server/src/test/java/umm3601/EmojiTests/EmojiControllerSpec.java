package umm3601.EmojiTests;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;
import org.bson.codecs.*;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.json.JsonReader;
import org.junit.Before;
import org.junit.Test;
import umm3601.Emojis.EmojiController;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

public class EmojiControllerSpec {
    private EmojiController emojiController;

    @Before
    public void clearAndPopulateDB() throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = new MongoClient().getDatabase("test");
        MongoCollection<Document> emojiDocuments = db.getCollection("emojis");
        emojiDocuments.drop();
        List<Document> testEmojis = new ArrayList<>();
        testEmojis.add(Document.parse("{\n" + "user: \"Ethan\",\n" + "value: \"Happy\",\n" + "time_stamp: \"03/7/2018 10:00\"\n" + "}"));
        testEmojis.add(Document.parse("{\n" + "user: \"Abe\",\n" + "value: \"Neutral\",\n" + "time_stamp: \"03/4/2018 12:42\"\n" + "}"));
        testEmojis.add(Document.parse("{\n" + "user: \"Sungjae\",\n" + "value: \"Sad\",\n" + "time_stamp: \"01/19/2018 16:28\"\n" + "}"));
        testEmojis.add(Document.parse("{\n" + "user: \"Dustin\",\n" + "value: \"Angry\",\n" + "time_stamp: \"03/7/2017 08:00\"\n" + "}"));

        emojiDocuments.insertMany(testEmojis);

        emojiController = new EmojiController(db);
    }

    private BsonArray parseJsonArray(String json) {
        final CodecRegistry codecRegistry = CodecRegistries.fromProviders(Arrays.asList(
            new ValueCodecProvider(),
            new BsonValueCodecProvider(),
            new DocumentCodecProvider()));

        JsonReader reader = new JsonReader(json);
        BsonArrayCodec arrayReader = new BsonArrayCodec(codecRegistry);

        return arrayReader.decode(reader, DecoderContext.builder().build());
    }

    private static String getUser(BsonValue val) {
        BsonDocument doc = val.asDocument();
        return ((BsonString) doc.get("user")).getValue();
    }

    private static String getEmoji(BsonValue val) {
        BsonDocument doc = val.asDocument();
        return ((BsonString) doc.get("value")).getValue();
    }

    @Test
    public void getAllEmojis() {
        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = emojiController.getEmojis(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 4 Emojis", 4, docs.size());
        List<String> users = docs.stream().map(EmojiControllerSpec::getUser).sorted().collect(Collectors.toList());
        List<String> expectedUsers = Arrays.asList("Abe", "Dustin", "Ethan", "Sungjae");
        assertEquals("Users should match", expectedUsers, users);
    }

    @Test
    public void addEmojiTest() {
        String newId = emojiController.submitEmoji("Zeke","happy", "02/15/2017 10:57");
        Map<String, String[]> argMap = new HashMap<>();
        String jsonResult = emojiController.getEmojis(argMap);
        BsonArray docs = parseJsonArray(jsonResult);

        List<String> user = docs.stream().map(EmojiControllerSpec::getUser).sorted().collect(Collectors.toList());
        assertEquals("Should return name of new user", "Zeke", user.get(4));
    }
}
