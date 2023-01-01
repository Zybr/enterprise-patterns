module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
	modulePathIgnorePatterns: [
		'<rootDir>/src/Complex patterns/Offline Concurrency/generic/Storage/Storage.test.ts',
		'<rootDir>/src/Complex patterns/Offline Concurrency/Optimistic Offline Lock/Storage.test.ts',
		'<rootDir>/src/Complex patterns/Offline Concurrency/Pessimistic Offline Lock/Storage/RecordLockStorage.test.ts',
		'<rootDir>/src/Complex patterns/Offline Concurrency/Pessimistic Offline Lock/RecordLockManager.test.ts',
		'<rootDir>/src/Complex patterns/Offline Concurrency/Implicit Lock/Pessimistic Offline Lock/Repository.test.ts',
	],
}
