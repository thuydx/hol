## Data Storage Architecture
```
LocalStorage (uploadedJson)
  │
  ▼
┌───────────────────────────┐
│  gameData.model.ts        │  ← MODEL LAYER
│  - schema-aware read/write│
│  - column + sub-column    │
└───────────────────────────┘
  │
  ▼
┌───────────────────────────┐
│  BaseRepository.ts        │  ← REPOSITORY LAYER
│  - CRUD via model         │
│  - no LocalStorage logic  │
└───────────────────────────┘
  │
  ▼
┌───────────────────────────┐
│  Generated Repositories   │  ← AUTO-GENERATED
│  - per key                │
│  - per column/subcolumn   │
└───────────────────────────┘
```
