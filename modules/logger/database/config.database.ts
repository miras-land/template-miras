import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts";
const client = new Client().connect({
    hostname: "localhost",
    username: "root",
    password: "",
    db: "loggerdb"
})
export default client;