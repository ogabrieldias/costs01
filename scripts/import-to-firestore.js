/*
  scripts/import-to-firestore.js

  Uso:
    node scripts/import-to-firestore.js <path-to-serviceAccountKey.json>

  O script importa `projects` e `categories` do arquivo `db.json` na raiz do projeto
  para as coleções `projects` e `categories` do Firestore, usando os ids existentes
  (campo `id`) como document IDs quando presente.
*/

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('Usage: node scripts/import-to-firestore.js <serviceAccountKey.json>');
  process.exit(1);
}

const keyPath = process.argv[2];
const absKeyPath = path.isAbsolute(keyPath) ? keyPath : path.join(process.cwd(), keyPath);

if (!fs.existsSync(absKeyPath)) {
  console.error('Service account key file not found:', absKeyPath);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(require(absKeyPath)),
});

const db = admin.firestore();

async function importCollection(collectionName, items) {
  console.log(`Importing ${items.length} ${collectionName}...`);
  for (const item of items) {
    try {
      const id = item.id ? String(item.id) : undefined;
      const docRef = id ? db.collection(collectionName).doc(id) : db.collection(collectionName).doc();
      // Remove id field from document data to avoid duplication as field
      const data = Object.assign({}, item);
      delete data.id;
      await docRef.set(data, { merge: true });
      console.log(`  -> ${collectionName}/${docRef.id}`);
    } catch (err) {
      console.error('Error importing item', item, err);
    }
  }
}

async function run() {
  const dbJsonPath = path.join(process.cwd(), 'db.json');
  if (!fs.existsSync(dbJsonPath)) {
    console.error('db.json not found in project root:', dbJsonPath);
    process.exit(1);
  }

  const raw = fs.readFileSync(dbJsonPath, 'utf8');
  const data = JSON.parse(raw);

  if (data.projects && Array.isArray(data.projects)) {
    await importCollection('projects', data.projects);
  } else {
    console.log('No projects array found in db.json');
  }

  if (data.categories && Array.isArray(data.categories)) {
    await importCollection('categories', data.categories);
  } else {
    console.log('No categories array found in db.json');
  }

  console.log('Import finished');
  process.exit(0);
}

run().catch(err => {
  console.error('Import failed', err);
  process.exit(1);
});
