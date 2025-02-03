/*
  Warnings:

  - You are about to drop the column `address` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `sector` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `tradeName` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Company` table. All the data in the column will be lost.
  - Added the required column `capitalSocial` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faturamentoAnual` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeEmpresa` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeFantasia` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setorAtividade` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoEmpresa` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomeEmpresa" TEXT NOT NULL,
    "nomeFantasia" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "tipoEmpresa" TEXT NOT NULL,
    "capitalSocial" TEXT NOT NULL,
    "faturamentoAnual" TEXT NOT NULL,
    "setorAtividade" TEXT NOT NULL,
    "foundationDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Company" ("cnpj", "createdAt", "foundationDate", "id", "updatedAt") SELECT "cnpj", "createdAt", "foundationDate", "id", "updatedAt" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
