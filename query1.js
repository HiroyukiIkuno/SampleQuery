router.get("/", async (req, res) => {
  console.log("GET /subjects");
  const builderId = req.cookies.builder_id;

  const searchQuery = req.query.search || "";
  const sortQuery = (req.query.sort || "id")
    .split(",")
    .filter(Boolean)
    .map((field) => {
      const desc = field.startsWith("-");
      const col = desc ? field.slice(1) : field;

      if (!["id", "name", "addr", "created_at", "updated_at"].includes(col))
        return null;
      return `${col} ${desc ? "DESC" : "ASC"}`;
    })
    .filter(Boolean)
    .join(", ");
  const limitQuery = req.query.limit || 10;
  const offsetQuery = req.query.offset || 0;

  console.log("Search Query:", searchQuery);
  console.log("Sort Query:", sortQuery);
  console.log("Limit Query:", limitQuery);
  console.log("Offset Query:", offsetQuery);

  const sql = await readFile(
    path.join(__dirname, "../db/queries/select_subjects.sql"),
    "utf8"
  );

  console.log("SQL Query:", sql);
  const result = await pool.query(sql, [
    `%${searchQuery}%`,
    builderId,
    sortQuery,
    limitQuery,
    offsetQuery,
  ]);

  res.status(200).json(result.rows);
});