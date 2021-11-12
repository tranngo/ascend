/*
  Warnings:

  - The values [BEGINNER,INTERMEDIATE,ADVANCED,MASTERY] on the enum `ChampionProficiencyLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChampionProficiencyLevel_new" AS ENUM ('Beginner', 'Intermediate', 'Advanced', 'Mastery');
ALTER TABLE "ChampionPool" ALTER COLUMN "proficiencyLevel" TYPE "ChampionProficiencyLevel_new" USING ("proficiencyLevel"::text::"ChampionProficiencyLevel_new");
ALTER TYPE "ChampionProficiencyLevel" RENAME TO "ChampionProficiencyLevel_old";
ALTER TYPE "ChampionProficiencyLevel_new" RENAME TO "ChampionProficiencyLevel";
DROP TYPE "ChampionProficiencyLevel_old";
COMMIT;
