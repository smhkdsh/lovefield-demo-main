var audioSchemeBuilder = lf.schema.create('audioLibrary', 1);

audioSchemeBuilder
  .createTable("Artist")
  .addColumn("id", lf.Type.INTEGER)
  .addColumn("fullName", lf.Type.STRING)
  .addColumn("alias", lf.Type.STRING)
  .addPrimaryKey([{ name: "id", autoIncrement: true}]);

audioSchemeBuilder
  .createTable("Album")
  .addColumn("id", lf.Type.INTEGER)
  .addColumn("albumName", lf.Type.STRING)
  .addColumn("releaseDate", lf.Type.DATE_TIME)
  .addColumn("artistId", lf.Type.INTEGER)
  .addPrimaryKey([{ name: "id", autoIncrement: true}])
  .addForeignKey("fk_ArtistId", {
    local: "artistId",
    ref: "Artist.id",
  });

audioSchemeBuilder
  .createTable("Track")
  .addColumn("id", lf.Type.INTEGER)
  .addColumn("trackName", lf.Type.STRING)
  .addColumn("trackLength", lf.Type.INTEGER) //длительность трека в секундах
  .addColumn("albumId", lf.Type.INTEGER)
  .addPrimaryKey([{ name: "id", autoIncrement: true}])
  .addForeignKey("fk_AlbumId", {
    local: "albumId",
    ref: "Album.id",
  });

audioSchemeBuilder
  .createTable("MusicalGenre")
  .addColumn("id", lf.Type.INTEGER)
  .addColumn("genreName", lf.Type.STRING)
  .addPrimaryKey([{ name: "id", autoIncrement: true}]);

audioSchemeBuilder
  .createTable("TrackMusicalGenre")
  .addColumn("id", lf.Type.INTEGER)
  .addColumn("musicalGenreId", lf.Type.INTEGER)
  .addColumn("trackId", lf.Type.INTEGER)
  .addPrimaryKey([{ name: "id", autoIncrement: true}])
  .addForeignKey("fk_MusicalGenreId", {
    local: "musicalGenreId",
    ref: "MusicalGenre.id",
  })
  .addForeignKey("fk_TrackId", {
    local: "trackId",
    ref: "Track.id",
  });

//const schemaBuilder = lf.schema.create("todo", 1);
//
//schemaBuilder
//  .createTable("Artist")
//  .addColumn("id", lf.Type.INTEGER)
//  .addColumn("description", lf.Type.STRING)
//  .addColumn("deadline", lf.Type.DATE_TIME)
//  .addColumn("done", lf.Type.BOOLEAN)
//  .addPrimaryKey(["id"])
//  .addIndex("idxDeadline", ["deadline"], false, lf.Order.DESC);
//
//let todoDb;
//let item;
//schemaBuilder
//  .connect()
//  .then(function (db) {
//    todoDb = db;
//    item = db.getSchema().table("Item");
//    let row = item.createRow({
//      id: 1,
//      description: "Get a cup of coffee",
//      deadline: new Date(),
//      done: false,
//    });
//
//    return db.insertOrReplace().into(item).values([row]).exec();
//  })
//  .then(function () {
//    return todoDb.select().from(item).where(item.done.eq(false)).exec();
//  })
//  .then(function (results) {
//    results.forEach(function (row) {
//      console.log(row["description"], "before", row["deadline"]);
//      document.body.textContent =
//        row["description"] + " before " + row["deadline"];
//    });
//  });
//