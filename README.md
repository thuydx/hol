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

#### SessionTable
```php
// Insert
sessiondb()->table('users')->insert(['name' => 'Alice']);

// Get all
$users = sessiondb()->table('users')->all();

// Find by id
$user = sessiondb()->table('users')->find(1);

// Update
sessiondb()->table('users')->update(1, ['name' => 'Alice Updated']);

// Delete
sessiondb()->table('users')->delete(1);

// Where chain
$filtered = sessiondb()
->table('users')
->where(fn($row) => $row['name'] === 'Alice Updated')
->get();
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
