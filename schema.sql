DROP TABLE IF EXISTS pc;
CREATE TABLE IF NOT EXISTS pc (
    numeroSerie TEXT PRIMARY KEY,
    modele TEXT NOT NULL,
    anneeSortie DATE,
    processeur TEXT NOT NULL,
    memoire TEXT NOT NULL,
    etat TEXT NOT NULL,
    capaciteStockage TEXT NOT NULL,
    couleur TEXT,
    typeLangueClavier TEXT,
    tailleEcran TEXT NOT NULL,
    cycleBatterie INTEGER NOT NULL,
    touchBar TEXT NOT NULL,
    description TEXT,
    images TEXT,
    prix TEXT NOT NULL,
    vendu BOOLEAN  NOT NULL
);
