-- CreateEnum
CREATE TYPE "ChampionProficiencyLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'MASTERY');

-- CreateTable
CREATE TABLE "ChampionPool" (
    "id" SERIAL NOT NULL,
    "championId" INTEGER NOT NULL,
    "proficiencyLevel" "ChampionProficiencyLevel" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ChampionPool_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChampionPool" ADD CONSTRAINT "ChampionPool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
