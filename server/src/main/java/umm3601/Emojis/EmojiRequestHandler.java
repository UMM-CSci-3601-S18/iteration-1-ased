package umm3601.Emojis;

import com.mongodb.BasicDBObject;
import com.mongodb.util.JSON;
import spark.Request;
import spark.Response;

public class EmojiRequestHandler {

    private final EmojiController emojiController;
    public EmojiRequestHandler(EmojiController emojiController){
        this.emojiController = emojiController;
    }

    public String getEmojiJSON(Request req, Response res){
        res.type("application/json");
        String id = req.params("id");
        String emoji;
        try {
            emoji = emojiController.getEmoji(id);
        } catch (IllegalArgumentException e) {
            res.status(400);
            res.body("The requested emoji id " + id + " wasn't a legal Mongo Object ID.\n" +
            "See 'https://docs.mongodb.com/manual/reference/method/ObjectID/' for more info.");
            return "";
        }
        if (emoji != null) {
            return emoji;
        } else {
            res.status(404);
            res.body("The requested emoji with id " + id + " was not found");
            return "";
        }
    }

    public String getEmojis(Request req, Response res) {
        res.type("application/json");
        return emojiController.getEmojis(req.queryMap().toMap());
    }

    public String submitEmoji(Request req, Response res) {
        res.type("application/json");
        Object o = JSON.parse(req.body());
        try {
            if(o.getClass().equals(BasicDBObject.class)) {
                try {
                    BasicDBObject dbO = (BasicDBObject) o;

                    String type = dbO.getString("type");
                    String time_stamp = dbO.getString("time_stamp");

                    System.err.println("Submitting new emoji [type=" + type + ", time_stamp=" + time_stamp + "]");
                    return emojiController.submitEmoji(type, time_stamp).toString();
                } catch (NullPointerException e) {
                    System.err.println("A value was malformed or omitted, submit emoji request failed.");
                    return null;
                }
            } else {
                System.err.println("Expected BasicDBObject, received " + o.getClass());
                return null;
            }
        } catch (RuntimeException ree) {
            ree.printStackTrace();
            return null;
        }
    }
}
