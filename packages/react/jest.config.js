module.exports={
    roots:['<rootDir>/src'],
    testRegex:'(/.*\\.test)\\.(ts|tsx)$',
    setupFilesAfterEnv:['<rootDir>/jest.setup.ts'],
    testEnvironment: "jsdom",
    "moduleNameMapper":{
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
   }
}