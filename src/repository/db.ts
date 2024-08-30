import initDb from "better-sqlite3";

export const db = initDb("test.db", {});
db.pragma("journal_mode = WAL");
