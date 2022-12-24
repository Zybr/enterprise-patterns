export default {
  entities: ['./dist/src/**/entities/*.entity.js'],
  entitiesTs: ['./src/**/entities/*.entity.ts'],
  autoLoadEntities: true,
  dbName: 'database/polyclinic.sqlite',
  type: 'sqlite',
  migrations: {
    path: './database/migrations',
    snapshot: false
  },
  seeder: {
    path: './database/seeders', // path to the folder with seeders
    pathTs: undefined, // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
}
