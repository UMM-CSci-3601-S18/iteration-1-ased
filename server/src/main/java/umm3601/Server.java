package umm3601;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import spark.Request;
import spark.Response;
import umm3601.Emojis.EmojiController;
import umm3601.Emojis.EmojiRequestHandler;
import umm3601.goals.GoalsController;

import umm3601.goal.GoalController;
import umm3601.goal.GoalRequestHandler;

import java.io.IOException;


import static spark.Spark.*;
import static spark.debug.DebugScreen.enableDebugScreen;

public class Server {
    private static final String emojiDataBaseName = "dev";
  //  private static final String userDatabaseName = "dev";
    private static final String goalDatabaseName = "dev";
    private static final int serverPort = 4567;

    public static void main(String[] args) throws IOException {

        MongoClient mongoClient = new MongoClient();
        MongoDatabase emojiDatabase = mongoClient.getDatabase(emojiDataBaseName);

        EmojiController emojiController = new EmojiController(emojiDatabase);
        EmojiRequestHandler emojiRequestHandler = new EmojiRequestHandler(emojiController);
//        MongoDatabase userDatabase = mongoClient.getDatabase(userDatabaseName);
        MongoDatabase goalDatabase = mongoClient.getDatabase(goalDatabaseName);


    //    UserController userController = new UserController(userDatabase);
     //   UserRequestHandler userRequestHandler = new UserRequestHandler(userController);


        GoalController goalController = new GoalController(goalDatabase);
        GoalRequestHandler goalRequestHandler = new GoalRequestHandler(goalController);




        //Configure Spark
        port(serverPort);
        enableDebugScreen();

        // Specify where assets like images will be "stored"
        staticFiles.location("/public");

        options("/*", (request, response) -> {

            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

        // Redirects for the "home" page
        redirect.get("", "/");

        redirect.get("/", "http://localhost:9000");

        // Add an emoji to the database
        get("api/emojis/new", emojiRequestHandler::submitEmoji);
        /// User Endpoints ///////////////////////////
        /////////////////////////////////////////////

        //List users, filtered using query parameters


        // List goals, filtered using query parameters


        get("api/goals", goalRequestHandler::getGoals);
        get("api/goals/:id", goalRequestHandler::getGoalJSON);
        post("api/goals/new", goalRequestHandler::addNewGoal);






        // An example of throwing an unhandled exception so you can see how the
        // Java Spark debugger displays errors like this.
        get("api/error", (req, res) -> {
            throw new RuntimeException("A demonstration error");
        });

        // Called after each request to insert the GZIP header into the response.
        // This causes the response to be compressed _if_ the client specified
        // in their request that they can accept compressed responses.
        // There's a similar "before" method that can be used to modify requests
        // before they they're processed by things like `get`.
        after("*", Server::addGzipHeader);

        // Handle "404" file not found requests:
        notFound((req, res) -> {
            res.type("text");
            res.status(404);
            return "Sorry, we couldn't find that!";
        });
    }

    // Enable GZIP for all responses
    private static void addGzipHeader(Request request, Response response) {
        response.header("Content-Encoding", "gzip");
    }
}
