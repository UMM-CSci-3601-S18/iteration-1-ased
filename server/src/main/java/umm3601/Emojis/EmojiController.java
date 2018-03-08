package umm3601.Emojis;


import com.google.gson.Gson;
import com.mongodb.*;
import com.mongodb.client.DistinctIterable;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;

import javax.print.Doc;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import static com.mongodb.client.model.Filters.eq;

public class EmojiController {

    private final Gson gson;
    private MongoDatabase database;
    private final MongoCollection<Document> emojiCollection;

    public EmojiController(MongoDatabase database) {
        gson = new Gson();
        this.database = database;
        emojiCollection = database.getCollection("emojis");
    }

    public String getEmoji(String id) {
        FindIterable<Document> jsonEmojis = emojiCollection.find(eq("_id", new ObjectId(id)));

        Iterator<Document> iterator = jsonEmojis.iterator();
        if (iterator.hasNext()) {
            Document emoji = iterator.next();
            return emoji.toJson();
        } else {
            return null;
        }
    }

    public String getEmojis(Map<String, String[]> queryParams) {
        Document filterDoc = new Document();

        FindIterable<Document> matchingEmojis = emojiCollection.find(filterDoc);

        return JSON.serialize(matchingEmojis);
    }

    public String submitEmoji(String user, String type, String time_stamp) {
        Document newEmoji = new Document();
        newEmoji.append("user", user);
        newEmoji.append("type", type);
        newEmoji.append("time_stamp", time_stamp);

        System.out.println("The server went through submitEmoji in EmojiController");

        try {
            emojiCollection.insertOne(newEmoji);
            ObjectId id = newEmoji.getObjectId("_id");
            System.err.println("Successfully added new emoji [_id=" + id + ", type=" + type + "user=" + user + ", time=" + time_stamp + "]");
            return JSON.serialize(id);
        } catch (MongoException me) {
            me.printStackTrace();
            return null;
        }
    }
}
