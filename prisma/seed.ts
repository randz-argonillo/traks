import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { artistsData } from "./songsData";

const prisma = new PrismaClient();

async function run() {
  // artists seed
  console.log('Seeding artists...');
  await Promise.all(
    artistsData.map((artist) =>
      prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      })
    )
  );

  // user seed
  console.log('Seeding user...');
  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: "user@mail.com" },
    update: {},
    create: {
      name: "user",
      email: "user@mail.com",
      password: bcrypt.hashSync("password", salt),
    },
  });

  console.log('Seeding playlists');
  const songs = await prisma.song.findMany({});
  const playlist = await prisma.playlist.findFirst();

  if (playlist !== null) return;

  await Promise.all(
    new Array(10).fill(1).map((_, i) =>
      prisma.playlist.create({
        data: {
          name: `Playlist ${i}`,
          user: { connect: { id: user.id } },
          songs: {
            connect: songs.map((song) => ({
              id: song.id,
            })),
          },
        },
      })
    )
  );
}

run()
  .catch((exception) => {
    console.log("An error occurred", exception);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
