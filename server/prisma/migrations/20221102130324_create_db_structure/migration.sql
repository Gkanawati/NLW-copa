-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,
    CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Participant_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "firstTeamCountryCode" TEXT NOT NULL,
    "secondTeamCountryCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Guess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstTeamPoints" INTEGER NOT NULL,
    "secondTeamPOints" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    CONSTRAINT "Guess_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guess_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Poll" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT,
    CONSTRAINT "Poll_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Poll" ("code", "createdAt", "id", "title") SELECT "code", "createdAt", "id", "title" FROM "Poll";
DROP TABLE "Poll";
ALTER TABLE "new_Poll" RENAME TO "Poll";
CREATE UNIQUE INDEX "Poll_code_key" ON "Poll"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Participant_userId_pollId_key" ON "Participant"("userId", "pollId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
