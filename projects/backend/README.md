# hol


### Development

#### Coverage
```bash
php artisan test --coverage --coverage-clover=build/reports/coverage.xml
```
#### Helper functionss
Get the current guest uuid
```php
$uuid = guest_uuid();
```

Get the JSON file path for a table
```php
$filePath = table_file_path('users');
```

Work with tables via SessionDatabase
```php
$users = sessiondb()->table('users')->all();
sessiondb()->table('users')->insert(['name' => 'Alice']);
```

#### SessionDatabase
```php
use ThuyDX\SessionDb\SessionDatabase;

// after you validated and read JSON file into $payload (assoc array)
$payload = json_decode($fileContents, true);

// create db instance for the uploaded uuid (use explicit uuid so we don't rely on cookie)
$db = new SessionDatabase('json', $safeUuid);

// import: this will write keys/<table>.json and values/<table>.json
$db->importFromArray($payload);

// verify
$typeForXun = $db->getTableType('XunXing_King'); // string or array
$valuesForXun = $db->getTableData('XunXing_King'); // array of strings
// stored files (json driver):
// storage/app/public/<basePath?>/<uuid>/keys/XunXing_King.json
// storage/app/public/<basePath?>/<uuid>/values/XunXing_King.json

```

#### SessionTable
```php
$db = new SessionDatabase('json', $uuid);

// Table wrapper
$table = $db->table('XunXing_King');

// Set type
$table->setType("System.Collections.Generic.List`1[[System.String, ...]]");

// Insert values
$table->insert(['name' => 'Hero', 'id' => 1]);
$table->insert(['name' => 'Mage']); // auto-id 2

// Update row
$table->update(1, ['name' => 'Hero Updated']);

// Delete row
$table->delete(2);

// Truncate
$table->truncate();

// Read type + values
$type  = $table->getType();
$rows  = $table->all();
$first = $table->first();

```
#### Commands
```bash
# Flush single UUID (with confirmation)
php artisan sessiondb:flush --uuid=123e4567-e89b-12d3-a456-426614174000

# Flush single UUID (no confirmation)
php artisan sessiondb:flush --uuid=123e4567-e89b-12d3-a456-426614174000 --force

# Flush all guest DBs (with confirmation)
php artisan sessiondb:flush --all

# Flush all guest DBs (no confirmation)
php artisan sessiondb:flush --all --force

```
