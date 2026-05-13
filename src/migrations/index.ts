import * as migration_20251112_204834_migration from './20251112_204834_migration';

export const migrations = [
  {
    up: migration_20251112_204834_migration.up,
    down: migration_20251112_204834_migration.down,
    name: '20251112_204834_migration'
  },
];
