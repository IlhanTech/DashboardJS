const services = {
    "GoogleAuth": {
        widgets: []
    },
    "Steam": {
        widgets: [
            {
                name: "game_player_count",
                description: "Display the number of players in a game",
                params: [
                    { name: "game_id", type: "string" }
                ]
            }
        ]
    },
    "Weather": {
        widgets: [
            {
                name: "city_temperature",
                description: "Display temperature for a city",
                params: [
                    { name: "city", type: "string" }
                ]
            }
        ]
    },
    "TMDB": {
        widgets: [
            {
                name: "top_movies_week",
                description: "Display top movies of the week",
                params: []
            }
        ]
    }
};

export default services;
